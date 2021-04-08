from .nodes import NODE_CLASSES
from . import utils


def compile_markdown(raw_input: str) -> str:

    for node_cls in NODE_CLASSES:

        for match in node_cls.get_matches(raw_input):
            html = node_cls.build_html(match)
            string_to_replace = node_cls.get_string_to_replace(match)
            raw_input = utils.replace_md_with_html(raw_input,
                                                   string_to_replace, html)

    #print(f'Compiled: \n{raw_input}\n---------------------------\n')
    print(raw_input)
    return raw_input
