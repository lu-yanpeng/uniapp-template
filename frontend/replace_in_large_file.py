# 替换TARGET为相对导入，python >= 3.9
from pathlib import Path
from typing import Generator

# 打包后的路径
RAW_PATH = 'remote-components/dist/build/h5/assets'
# 要导入的文件名，全局搜索它并改成相对导入
# 启动应用的时候如果控制台报错：某个包需要相对导入。就把它的名字复制到这里全局替换成相对导入
TARGET = '__federation_fn_import'


def main():
    """
    全局搜索TARGET目标文件，然后把他改成相对导入
    """
    p = Path.cwd() / RAW_PATH
    if not p.exists():
        print(f'路径 {p.resolve()} 不存在')
        return

    # 查找导入失败的文件名
    import_name = ''
    for target_file in p.iterdir():
        if TARGET in target_file.name:
            import_name = target_file.name
            break
    if not import_name:
        print(f'目标文件 {TARGET} 不存在')
        return

    # 要替换的字符
    target_str = f'from"{import_name}'
    # 替换后的字符，把原来的绝对导入改成相对导入
    replacement = f'from"./{import_name}'

    def replace_in_large_file(item: Generator[Path, None, None]):
        # 遍历RAW_PATH下的所有文件和文件夹
        for __file in item:            
            if __file.is_file() and __file.suffix in ('.js', '.css'):
                with __file.open('r+', encoding='utf-8') as input_file:                                    
                    content = input_file.read()
                    # 在文件内容中查找并替换目标字符串
                    new_content = content.replace(target_str, replacement)
                    # 将光标移至文件开头，清空文件内容，然后写入修改后的内容
                    input_file.seek(0)
                    input_file.truncate()
                    input_file.write(new_content)
            elif __file.is_dir():
                replace_in_large_file(__file.iterdir())
    replace_in_large_file(p.iterdir())
    print(import_name, '替换完成', sep='\n')


if __name__ == '__main__':
    main()
