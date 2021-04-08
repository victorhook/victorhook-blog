import re

from . import utils
from . import tag_classnames


class Regexes:
    H1 = re.compile('(#)(.*)')
    H2 = re.compile('(##)(.*)')
    H3 = re.compile('(###)(.*)')
    H4 = re.compile('(####)(.*)')
    P = re.compile('\n(.*)\n')
    LINK = re.compile(r'(\[(.*)\])(\((.*)\))')
    IMAGE = re.compile(r'(!\[(.*)\])(\((.*)\))')
    LineBreak = re.compile('\n\n')


class Node:
    """ This class is a base class for all nodes that
        want to match markdown to html.

        This class should be inherited and
        set_params, set_content should be overriden by the child.
    """

    # This pattern will match with the raw markdown.
    regex: re.Pattern = None

    # Tag to inject into the html.
    html_tag: str = ''

    # List of classnames that should be added to the tag.
    classes: list = []

    # Amount of repetitions for the tag. Useful for linebreaks etc.
    repeat_tag = 1

    # -- Default methods which can be overwritten by child. -- #

    @classmethod
    def get_matches(cls, raw_input: str) -> tuple:
        return cls.regex.findall(raw_input)

    @classmethod
    def get_params(cls, match: tuple) -> dict:
        # The indexes of the match corresponds to the regex groups.
        return dict()

    @classmethod
    def get_content(cls, match: tuple) -> str:
        # The indexes of the match corresponds to the regex groups.
        return None

    @classmethod
    def get_string_to_replace(cls, match: tuple) -> str:
        return ''.join(match)

    @classmethod
    def build_html(cls, match: tuple) -> str:
        """ Builds the actualy html tag that will the markdown will be
            replaced by.
        """
        # Set params and content before we build the string

        content = cls.get_content(match)
        params = cls.get_params(match)

        # Build initial tag
        html = f'<{cls.html_tag}'
        for key, val in params.items():
            html += f' {key}={val}'

        if len(cls.classes) > 0:
            html += f' class="{"".join(cls.classes)}"'

        if content is None:
            # If not content, we close the entire tag, making it easier to read
            html += '/>'
        else:
            # Close the tag and append the content.
            html += '>'
            # Append content
            html += utils.trim_content(content)
            # Close tag
            html += f'</{cls.html_tag}>'

        return html * cls.repeat_tag


class Header(Node):
    """ Base class for all header tags. """
    classes = tag_classnames.HEADERS

    @classmethod
    def get_content(cls, match: tuple) -> str:
        return match[1]


class H4(Header):
    regex: re.Pattern = Regexes.H4
    html_tag: str = 'h4'


class H3(Header):
    regex: re.Pattern = Regexes.H3
    html_tag: str = 'h3'


class H2(Header):
    regex: re.Pattern = Regexes.H2
    html_tag: str = 'h2'


class H1(Header):
    regex: re.Pattern = Regexes.H1
    html_tag: str = 'h1'


class P(Node):
    regex: re.Pattern = Regexes.P
    html_tag: str = 'p'
    
    @classmethod
    def get_string_to_replace(cls, match: tuple) -> str:
        print(f'p ---> {match}')
        return match[1]

class Img(Node):
    regex: re.Pattern = Regexes.IMAGE
    html_tag: str = 'img'
    classes = tag_classnames.IMG

    @classmethod
    def get_string_to_replace(cls, match: tuple) -> str:
        return match[0] + match[2]

    @classmethod
    def get_params(cls, match: tuple) -> dict:
        return {
            'src': utils.add_quotes(match[1]),
            'alt': utils.add_quotes(match[3])
        }


class Link(Node):
    regex: re.Pattern = Regexes.LINK
    html_tag: str = 'a'
    classes = tag_classnames.LINK

    @classmethod
    def get_string_to_replace(cls, match: tuple) -> str:
        return match[0] + match[2]

    @classmethod
    def get_params(cls, match: tuple) -> dict:
        return {'href': utils.add_quotes(match[1])}

    @classmethod
    def get_content(cls, match: tuple) -> str:
        return match[3]


class LineBreak(Node):
    regex: re.Pattern = Regexes.LineBreak
    html_tag: str = 'br'
    classes = tag_classnames.LINEBREAK
    repeat_tag: int = 2


NODE_CLASSES = [
    H4,
    H3,
    H2,
    H1,
    Img,
    Link,
    LineBreak,
]
