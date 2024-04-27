# 替换TARGET为相对导入，python >= 3.9
from pathlib import Path

# 打包后的路径
RAW_PATH = 'remote-components/dist/build/h5/assets'
# 把默认的相对路径改成带host的绝对路径，这样在host端导入remote-app的时候才不会404
# 也就是直接指定remote-app的host地址
# preload-helper.2041a2d9.js
TARGET = 'preload-helper'


def main():
    """
    全局搜索TARGET目标文件，然后把他改成相对导入
    """
    p = Path.cwd() / RAW_PATH
    if not p.exists():
        print(f'路径 {p.resolve()} 不存在')
        return
    
    # 要替换的字符
    target_str = f'/remote-app/'
    # 替换后的字符，把原来的绝对导入改成相对导入
    replacement = f'http://localhost:4173/remote-app/'

    # 查找导入失败的文件名
    import_name = ''
    for target_file in p.iterdir():
        if TARGET in target_file.name:
            import_name = target_file.name
            with target_file.open('r+', encoding='utf-8') as input_file:                                    
                    content = input_file.read()
                    # 在文件内容中查找并替换目标字符串
                    new_content = content.replace(target_str, replacement)
                    # 将光标移至文件开头，清空文件内容，然后写入修改后的内容
                    input_file.seek(0)
                    input_file.truncate()
                    input_file.write(new_content)
            break
    if not import_name:
        print(f'目标文件 {TARGET} 不存在')
        return    
    print(import_name, '替换完成', sep='\n')


if __name__ == '__main__':
    main()
