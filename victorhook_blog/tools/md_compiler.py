text = """
# Here is some nice looking text! H1
## Here is H2
### Here is H3
### Here is H4

Here is an image: ![URLLNK](text)
Here is a linK: [https://google.com](click here)

Here is alot of blank space!

and som text under it.
"""

import re
from dataclasses import dataclass, field



@dataclass
class MdPattern:
    regex: re.Pattern
    html: str
    classes: list = field(default_factory=list)


@dataclass
class Replacement:
    raw_md: str
    new_html: str


RE_H1 = re.compile('(#)(.*)')
RE_H2 = re.compile('(##)(.*)')
RE_H3 = re.compile('(###)(.*)')
RE_H4 = re.compile('(####)(.*)')
RE_LINK = re.compile('(\[.*\])(\(.*\))')
RE_IMAGE = re.compile('(!\[.*\])(\(.*\))')
RE_SECTION = re.compile('\n\n')


class MarkdownCompiler:

    headers = [
        MdPattern(RE_H1, 'h1'),
        MdPattern(RE_H2, 'h2'),
        MdPattern(RE_H3, 'h3'),
        MdPattern(RE_H4, 'h4'),
    ]

    patterns = [
        MdPattern(RE_IMAGE, 'img'),
        MdPattern(RE_LINK, 'a'),
        MdPattern(RE_SECTION, 'section')
    ]


    def _parse_headers(markdown: str) -> str:
        for pattern in MarkdownCompiler.headers:
            matches = pattern.regex.findall(markdown)
            for match in matches:
                MarkdownCompiler._build_html(pattern, match)

    def _parse_links(markdown: str) -> str:
        pass
    def _parse_imgs(markdown: str) -> str:
        pass
    def _parse_sections(markdown: str) -> str:
        pass

    @staticmethod
    def _trim_content(raw_content: str):
        return raw_content.strip()

    @staticmethod
    def _build_html(pattern: MdPattern, match: tuple):
        #content = MarkdownCompiler._trim_content(content)
        pattern.parse(match)
        print(match)
        return
        return f'<{tag.html} class="{" ".join(tag.classes)}">'\
            f'{content}'\
            f'</{tag.html}>'

    @staticmethod
    def _replace(raw_input: str, replacements: list):
        for raw_md, new_html in replacements:
            re.sub

    @staticmethod
    def _create_tag(regex_match: tuple) -> None:
        RE_HEADER.findall(markdown)

    @staticmethod
    def _parse(markdown: str) -> list:
        matches = []

        for pattern in MarkdownCompiler.patterns:
            match = pattern.regex.findall(markdown)
            matches.append(match)

        for m in matches:
            print(m)

    @staticmethod
    def _find_replacements(tags: list) -> list:
        replacements = []
        print(tags)
        return replacements
        for header, content in headers:
            if header in tags:
                tag = tags[header]

                raw_md = header + content
                new_html = MarkdownCompiler._build_html(header, content, tag)

                replacements.append(Replacement(raw_md, new_html, RE_HEADER))

        return replacements

    @staticmethod
    def compile(markdown: str) -> str:
        """ Compiles primitive markdown to HTML. """
        replacements = MarkdownCompiler._parse_headers(markdown)
        #result = MarkdownCompiler._replace(markdown, replacements)
        print(replacements)


if __name__ == '__main__':
    MarkdownCompiler.compile(text)