from victorhook_blog.markdown_compiler import compile_markdown

text = """
# H1
## H2
### H3
#### H4
[www.google.com](LINK HERE)
![www.google.com](IMG HERE)

*Here* is some nice **text**.

"Here is a quote"

Here is some default bread-text.
I think this is some really nice text tbh



Dont you?

"""

res = compile_markdown(text)
print(res)