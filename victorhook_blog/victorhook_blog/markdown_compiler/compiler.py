from .nodes import NODE_CLASSES, Regexes
from . import utils


def compile_markdown(raw_input: str) -> str:
    # Build html tag for each node that is added in the classlist
    for node_cls in NODE_CLASSES:

        # Replace the raw md with correct html tag.
        for match in node_cls.get_matches(raw_input):
            html = node_cls.build_html(match)
            string_to_replace = node_cls.get_string_to_replace(match)
            raw_input = utils.replace_md_with_html(raw_input,
                                                    string_to_replace, 
                                                    html)

    compiled_text = ''

    # Leftover parts must now be wrapped as normal text.
    for line in raw_input.splitlines():
        if not Regexes.not_body_tags.match(line):
            line = utils.wrap_as_text(line)
            print(line, Regexes.not_body_tags.match(line))

        if utils.tag_ok(line):
            compiled_text += line


    return compiled_text
