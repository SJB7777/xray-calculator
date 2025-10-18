import random
import string
import re

def main():
    HTML_FILE = "index.html"

    def generate_random_string(length=8):
        chars = string.ascii_letters + string.digits
        return ''.join(random.choices(chars, k=length))

    random_str = generate_random_string()

    with open(HTML_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # main.js 뒤에 있는 쿼리스트링 전체를 찾아 바꾸기
    content = re.sub(r'main\.js(\?[^\s"\']*)?', f'main.js?v={random_str}', content)
    # styles.css 뒤에 있는 쿼리스트링 전체를 찾아 바꾸기
    content = re.sub(r'styles\.css(\?[^\s"\']*)?', f'styles.css?v={random_str}', content)

    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"[INFO] Updated index.html with random query string: {random_str}")

if __name__ == "__main__":
    main()
