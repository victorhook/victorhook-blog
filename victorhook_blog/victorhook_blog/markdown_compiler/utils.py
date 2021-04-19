def add_quotes(string: str) -> str:
    return f'"{string}"'


def trim_content(content: str) -> str:
    return content.strip()


def replace_md_with_html(raw_input: str, string_to_replace: str,
                         html: str) -> str:
    """ Replaces the match content with the html string.
        match should is a tuple of groups from regex.
    """
    return raw_input.replace(string_to_replace, html)


def wrap_as_text(paragraph: str) -> str:
    """ Wraps the paragraph as text. """
    return f'<p>{paragraph}</p>'


def tag_ok(tag: str) -> bool:
    """ Filter to ensure all tags are ok. """
    return tag != '<p></p>'
