"""Validacoes da documentacao do repositorio.

Uso: python scripts/validar_docs.py <estrutura|links|formato|seguranca>
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
IGNORAR = {".git", "node_modules", "dist"}
TOTAL_AULAS = 9


def arquivos(padrao):
    return [p for p in RAIZ.rglob(padrao) if not IGNORAR.intersection(p.parts)]


def estrutura():
    erros = []
    for n in range(1, TOTAL_AULAS + 1):
        aula = RAIZ / f"Aula{n:02d}"
        for obrigatorio in (aula / "conteudo" / "README.md", aula / "atividade" / f"Atividade{n:02d}.md"):
            if not obrigatorio.exists():
                erros.append(f"faltando: {obrigatorio.relative_to(RAIZ)}")
    return erros


def links():
    erros = []
    padrao = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")
    for md in arquivos("*.md"):
        for alvo in padrao.findall(md.read_text(encoding="utf-8")):
            if alvo.startswith(("http://", "https://", "mailto:", "#")):
                continue
            caminho = (md.parent / alvo.split("#")[0]).resolve()
            if not caminho.exists():
                erros.append(f"{md.relative_to(RAIZ)}: link quebrado -> {alvo}")
    return erros


def formato():
    erros = []
    emoji = re.compile("[\U0001F300-\U0001FAFF☀-➿⭐✅]")
    for md in arquivos("*.md"):
        texto = md.read_text(encoding="utf-8")
        nome = md.relative_to(RAIZ)
        if not texto.startswith("# "):
            erros.append(f"{nome}: deve comecar com um titulo '# '")
        if emoji.search(texto):
            erros.append(f"{nome}: contem emoji")
    return erros


def seguranca():
    erros = []
    padroes = {
        "chave privada": re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
        "token do GitHub": re.compile(r"gh[pousr]_[A-Za-z0-9]{36}"),
        "chave AWS": re.compile(r"AKIA[0-9A-Z]{16}"),
    }
    for arquivo in arquivos("*"):
        if not arquivo.is_file() or arquivo.suffix in {".png", ".jpg", ".pdf"}:
            continue
        texto = arquivo.read_text(encoding="utf-8", errors="ignore")
        for nome, padrao in padroes.items():
            if padrao.search(texto):
                erros.append(f"{arquivo.relative_to(RAIZ)}: possivel {nome}")
    return erros


VERIFICACOES = {"estrutura": estrutura, "links": links, "formato": formato, "seguranca": seguranca}

if __name__ == "__main__":
    if len(sys.argv) != 2 or sys.argv[1] not in VERIFICACOES:
        sys.exit(f"uso: {sys.argv[0]} <{'|'.join(VERIFICACOES)}>")
    problemas = VERIFICACOES[sys.argv[1]]()
    for p in problemas:
        print(f"ERRO {p}")
    print(f"{sys.argv[1]}: {len(problemas)} problema(s)")
    sys.exit(1 if problemas else 0)
