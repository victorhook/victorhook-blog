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
