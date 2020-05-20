import sys
import os

def dir_structure(dir_path, f):
    files = [entry.name for entry in os.scandir(dir_path) if entry.is_file() and entry.name.endswith(('.jpg', '.png', '.bmp'))]
    for entry in os.scandir(dir_path):
        if entry.is_dir():
            dir_structure(entry.path, f)
    if files != []:
        f.write('    {{\n        entry:\'\',\n        dir:\'{}\',\n        files:{}\n    }},\n'.format(dir_path, files))


if __name__ == '__main__':
    with open('fs.js', 'w') as f:
        f.write('let fs_JSON = [\n')
        dir_structure(sys.argv[1], f)
        f.write(']\n')
        f.write('let platformEntry =\'\'\n')
        f.write('let versionEntry =\'\'\n')
        f.write('let formId =\'\'')
