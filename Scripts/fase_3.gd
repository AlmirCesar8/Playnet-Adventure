extends Node2D

#caminho da cena como uma constante
const PushableCratePath = "res://Scenes/crate.tscn"

# Dicionário que mapeia o id das caixas para suas posições
var spawn_positions = {
	0: Vector2(1100, 100),
	1: Vector2(1100, 300),
	2: Vector2(1200, 300),
	3: Vector2(1300, 300),
	4: Vector2(1400, 300),
	5: Vector2(1500, 300),
	6: Vector2(1600, 300),
	7: Vector2(1700, 300),
	8: Vector2(1800, 300),
	9: Vector2(1900, 300)
}

func _ready():
	# Carrega a cena como um PackedScene
	var PushableCrate = load(PushableCratePath)
	
	# Verifica o carregamento
	if PushableCrate == null:
		print("Falha ao carregar a cena:", PushableCratePath)
		return # Interrompe a execução se falhar

	for id in spawn_positions.keys(): # Itera pelas chaves do dicionário
		# Instancia uma nova caixa empurrável
		var crate = PushableCrate.instantiate()
		crate.id = id # Define o id da caixa
		crate.sprite_path = "res://Art Assets/Props/crate/crate0" + str(id) + ".png" # Define o caminho do sprite
		crate.position = spawn_positions[id] # Define a posição específica do dicionário
		add_child(crate) # Adiciona a caixa à cena
