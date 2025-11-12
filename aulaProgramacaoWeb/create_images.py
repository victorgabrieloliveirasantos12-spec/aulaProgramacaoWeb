#!/usr/bin/env python3
"""
Script para criar imagens placeholder para o Portal ONG
"""

from PIL import Image, ImageDraw
import os

# Criar diretório se não existir
os.makedirs('images', exist_ok=True)

# 1. favicon.ico (32x32) - Azul
img_favicon = Image.new('RGB', (32, 32), color=(59, 130, 246))
img_favicon.save('images/favicon.ico')
print("✓ favicon.ico criado")

# 2. profile.jpg (300x300) - Azul claro
img_profile = Image.new('RGB', (300, 300), color=(96, 165, 250))
draw = ImageDraw.Draw(img_profile)
draw.text((100, 140), 'Perfil', fill=(255, 255, 255))
img_profile.save('images/profile.jpg')
print("✓ profile.jpg criado")

# 3. hero-ong.jpg (1200x400) - Verde
img_hero = Image.new('RGB', (1200, 400), color=(16, 185, 129))
draw = ImageDraw.Draw(img_hero)
draw.text((400, 180), 'Portal ONG', fill=(255, 255, 255))
img_hero.save('images/hero-ong.jpg')
print("✓ hero-ong.jpg criado")

# 4. team-org.jpg (900x600) - Ciano
img_team = Image.new('RGB', (900, 600), color=(6, 182, 212))
draw = ImageDraw.Draw(img_team)
draw.text((350, 280), 'Nossa Equipe', fill=(255, 255, 255))
img_team.save('images/team-org.jpg')
print("✓ team-org.jpg criado")

# 5. placeholder-project.jpg (400x300) - Laranja
img_project = Image.new('RGB', (400, 300), color=(245, 158, 11))
draw = ImageDraw.Draw(img_project)
draw.text((120, 135), 'Projeto', fill=(255, 255, 255))
img_project.save('images/placeholder-project.jpg')
print("✓ placeholder-project.jpg criado")

# 6. icon-192x192.png (para PWA) - Azul
img_icon_192 = Image.new('RGB', (192, 192), color=(59, 130, 246))
img_icon_192.save('images/icon-192x192.png')
print("✓ icon-192x192.png criado")

# 7. icon-512x512.png (para PWA) - Azul
img_icon_512 = Image.new('RGB', (512, 512), color=(59, 130, 246))
img_icon_512.save('images/icon-512x512.png')
print("✓ icon-512x512.png criado")

print("\n✅ Todas as imagens foram criadas com sucesso na pasta 'images/'!")
