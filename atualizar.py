import os
import sys

print("=================================")
print("ATUALIZADOR VIDEOKÊ RIO")
print("=================================")
print()

ret = os.system("python converter.py")

if ret != 0:
    print()
    print("ERRO AO GERAR O JSON")
    sys.exit()

print()
print("Enviando para o GitHub...")
print()

os.system("git add .")
os.system('git commit -m "Atualiza catálogo"')
os.system("git push")

print()
print("=================================")
print("CATÁLOGO ATUALIZADO COM SUCESSO")
print("=================================")