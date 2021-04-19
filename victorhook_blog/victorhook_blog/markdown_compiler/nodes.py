import re

from . import utils
from . import tag_classnames


class Regexes:
    h1 = re.compile('(#)(.*)')
    h2 = re.compile('(##)(.*)')
    h3 = re.compile('(###)(.*)')
    h4 = re.compile('(####)(.*)')
    link = re.compile(r'(\[(.*)\])(\((.*)\))')
    image = re.compile(r'(!\[(.*)\])(\((.*)\))')
    linebreak = re.compile('\n\n')
    italic = re.compile('(\*)(.*?)(\*)')
    bold = re.compile('(\*\*)(.*?)(\*\*)')
    quote = re.compile('(")(.*?)(")')
    line = re.compile('(---)')
    not_body_tags = re.compile(r'(<h[1-4])|(<img)')


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

    # Amount of repetitions for the tag. Useful for LINE_BREAKs etc.
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
    def get_id(cls, match: tuple) -> str:
        # Having id is optional. It can be used for referencing, headers etc.
        return None

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

        # Add id if we have one.
        id = cls.get_id(match)
        if id is not None:
            params['id'] = id.replace(' ', '_')

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
    classes = tag_classnames.headers

    @classmethod
    def get_id(cls, match: tuple) -> str:
        return match[1]

    @classmethod
    def get_content(cls, match: tuple) -> str:
        return match[1]


class H4(Header):
    regex: re.Pattern = Regexes.h4
    html_tag: str = 'h4'


class H3(Header):
    regex: re.Pattern = Regexes.h3
    html_tag: str = 'h3'


class H2(Header):
    regex: re.Pattern = Regexes.h2
    html_tag: str = 'h2'


class H1(Header):
    regex: re.Pattern = Regexes.h1
    html_tag: str = 'h1'


class Img(Node):
    regex: re.Pattern = Regexes.image
    html_tag: str = 'img'
    classes = tag_classnames.image

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
    regex: re.Pattern = Regexes.link
    html_tag: str = 'a'
    classes = tag_classnames.link

    @classmethod
    def get_string_to_replace(cls, match: tuple) -> str:
        return match[0] + match[2]

    @classmethod
    def get_params(cls, match: tuple) -> dict:
        return {'href': utils.add_quotes(match[1])}

    @classmethod
    def get_content(cls, match: tuple) -> str:
        return match[3]


class TextStyle(Node):
    """ Base class for simple text-decorations, like ITALIC, Bold, Quotes etc. 
    """
    html_tag: str = 'span'

    @classmethod
    def get_content(cls, match: tuple) -> str:
        return match[1]


class Italic(TextStyle):
    regex: re.Pattern = Regexes.italic
    classes = tag_classnames.italic


class Bold(TextStyle):
    regex: re.Pattern = Regexes.bold
    classes = tag_classnames.bold


class Quote(TextStyle):
    regex: re.Pattern = Regexes.quote
    classes = tag_classnames.quote
    html_tag = 'q'


class LineBreak(Node):
    regex: re.Pattern = Regexes.linebreak
    html_tag: str = 'br'
    classes = tag_classnames.linebreak
    repeat_tag: int = 2


class Line(Node):
    html_tag: str = 'hr'
    regex: re.Pattern = Regexes.line
    classes = tag_classnames.line


"""
    Note! The order of the node matters, since the string is
    successively parsed AND changed.
"""
NODE_CLASSES = [
    Quote,
    Bold,
    Italic,
    H4,
    H3,
    H2,
    H1,
    Img,
    Link,
    Line
]
