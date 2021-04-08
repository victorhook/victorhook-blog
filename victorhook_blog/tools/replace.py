import re

text = """
# Here is some nice looking text! H1
## Here is H2
### Here is H3
#### Here is H4

Here is an image: ![URLLNK](text)
Here is a linK: [https://google.com](click here)

Here is alot of blank space!

and som text under it.
"""
from dataclasses import dataclass, field


@dataclass
class Node:
    regex: re.Pattern
    html_tag: str
    params: dict = field(default_factory=dict)
    classes: list = field(default_factory=list)

    content: str = None

    def build_html(self, match: tuple):
        if self.content is None:
            raise Exception('Content is none!')

        # Build initial tag
        html = f'<{self.replacement} '
        for key, val in self.params.items():
            html += f'{key}={val}'
        html += f' class="{"".join(self.classes)}">'

        # Append content
        html += self.content

        # Close tag
        html += f'</{self.html_tag}>'

        return html


class H1(Node):
    regex = re.compile('(#)(.*)')
    html_tag = 'h1'

class H2(Node):
    regex = re.compile('(##)(.*)')
    html_tag = 'h2'


class H3(Node):
    regex = re.compile('(###)(.*)')
    html_tag = 'h3'


class H4(Node):
    regex = re.compile('(####)(.*)')
    html_tag = 'h4'





nodes = [

]
RE_H1 = re.compile('(#)(.*)')
RE_H2 = re.compile('(##)(.*)')
RE_H3 = re.compile('(###)(.*)')
RE_H4 = re.compile('(####)(.*)')
RE_LINK = re.compile('(\[.*\])(\(.*\))')
RE_IMAGE = re.compile('(!\[.*\])(\(.*\))')
RE_SECTION = re.compile('\n\n')

REPL_H1 = 'h1'
REPL_H2 = 'h2'
REPL_H3 = 'h3'
REPL_H4 = 'h4'
REPL_IMAGE = 'img'
REPL_LINK = 'a'
REPL_SECTION = 'section'


pattern_pairs = [
    (RE_H4, REPL_H4),
    (RE_H3, REPL_H3),
    (RE_H2, REPL_H2),
    (RE_H1, REPL_H1),
    (RE_LINK, REPL_LINK),
    (RE_IMAGE, REPL_IMAGE),
    (RE_SECTION, REPL_SECTION)
]


def build_html(match: tuple, replacement: str) -> str:
    if replacement == 'a':
        pass
    elif replacement == 'img':
        pass
    elif replacement == 'section':
        pass
    else:
        content = match[1]
        html = f'<{replacement}>'


def replace(raw_text: str, match: tuple, replacement: str) -> str:

    replacement = build_html(match, replacement)

    string_to_replace = ''.join(str(part) for part in match)

    raw_text = re.sub(string_to_replace, replacement, raw_text)


    return raw_text


for regex, replacement in pattern_pairs[:1]:
    matches = regex.findall(text)

    for match in matches:
        text = replace(text, match, replacement)
