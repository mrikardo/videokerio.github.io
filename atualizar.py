import os

print("=================================")
print("ATUALIZADOR VIDEOKÊ RIO")
print("=================================")
print()

# Gera o JSON
os.system("python converter.py")

print()
print("Enviando para o GitHub...")
print()

# Git
os.system("git add .")
os.system('git commit -m "Atualiza catálogo"')
os.system("git push")

print()
print("=================================")
print("CATÁLOGO ATUALIZADO COM SUCESSO")
print("=================================")
print()
input("Pressione ENTER para sair...")