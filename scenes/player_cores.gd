extends CharacterBody2D
var screen_size # tamanho da tela do jogo
var grav = 10 #define gravidade para o personagem
@export var vel = 150 #define velocidade para o personagem

func _ready():
	screen_size = get_viewport_rect().size

func _process(delta): #executa os processos 60 vezes p/s
	if !is_on_floor():
		velocity.y += grav #velocity.y controla a força y
	
	if Input.is_action_pressed("ui_right"):
		velocity.x = vel  #velocity.x controla a força x
		$Sprite2D.flip_h = false #rotação personagem de acordo com a direção
		
	elif Input.is_action_pressed("ui_left"):
		velocity.x = -vel
		$Sprite2D.flip_h = true
	
	else:
		velocity.x = 0
	
	#configurar pulo do player
	if is_on_floor() and Input.is_action_pressed("ui_up"):
		velocity.y -= 200
	if velocity.length() > 0:
		velocity = velocity.normalized() * vel
		$AnimatedSprite2D.play()
	else:
		$AnimatedSprite2D.stop()
	position += velocity * delta
	position = position.clamp(Vector2.ZERO, screen_size)
	if velocity.x != 0:
		$AnimatedSprite2D.animation = ""
		$AnimatedSprite2D.flip_v = false
		if velocity.x < 0:
			$AnimatedSprite2D.flip_h = true
		else:
			$AnimatedSprite2D.flip_h = false
	elif velocity.y != 0:
		$AnimatedSprite2D.animation = "pulo"
		if velocity.y > 0:
			$AnimatedSprite2D.flip_v = true
		else:
			$AnimatedSprite2D.flip_v = false
