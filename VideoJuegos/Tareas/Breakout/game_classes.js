/**
 * Colección de clases que se usarán en el juego
 *
 * Emiliano Deyta
 * 2025-03-12
 */

/**
 * Clase que representa un vector 2D.
 */
class Vec {
    /**
     * Crea un vector.
     * @param {number} x - La coordenada x.
     * @param {number} y - La coordenada y.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Suma otro vector a este vector.
     * @param {Vec} other - El otro vector.
     * @returns {Vec} El vector resultante.
     */
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    /**
     * Resta otro vector de este vector.
     * @param {Vec} other - El otro vector.
     * @returns {Vec} El vector resultante.
     */
    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }

    /**
     * Multiplica el vector por un escalar.
     * @param {number} scalar - El factor escalar.
     * @returns {Vec} El vector resultante.
     */
    times(scalar) {
        return new Vec(this.x * scalar, this.y * scalar);
    }

    /**
     * Calcula la magnitud (longitud) del vector.
     * @returns {number} La magnitud del vector.
     */
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Crea una copia de este vector.
     * @returns {Vec} Un nuevo vector con las mismas coordenadas.
     */
    clone() {
        return new Vec(this.x, this.y);
    }

    /**
     * Retorna una versión normalizada de este vector.
     * Si el vector es cero, retorna un nuevo vector cero.
     * @returns {Vec} El vector normalizado.
     */
    normalized() {
        let mag = this.magnitude();
        return mag === 0 ? new Vec(0, 0) : new Vec(this.x / mag, this.y / mag);
    }
}

/**
 * Clase base para los objetos del juego.
 */
class GameObject {
    /**
     * Crea un objeto del juego.
     * @param {Vec} position - La posición del objeto.
     * @param {number} width - El ancho del objeto.
     * @param {number} height - La altura del objeto.
     * @param {string} color - El color para dibujar el objeto.
     * @param {string} type - El identificador de tipo del objeto.
     */
    constructor(position, width, height, color, type) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }

    /**
     * Dibuja el objeto en el contexto 2D dado.
     * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado 2D.
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    /**
     * Actualiza el estado del objeto.
     * Este método se puede sobrescribir en las subclases.
     * @param {number} deltaTime - El tiempo transcurrido desde la última actualización.
     */
    update(deltaTime) {
        // Función de actualización por defecto (puede sobrescribirse)
    }

    /**
     * Comprueba si este objeto colisiona con otro.
     * @param {GameObject} other - Otro objeto del juego.
     * @returns {boolean} True si hay colisión, false en caso contrario.
     */
    collidesWith(other) {
        return boxOverLap(this, other);
    }
}

/**
 * Detecta la colisión entre dos objetos rectangulares.
 * @param {GameObject} obj1 - El primer objeto.
 * @param {GameObject} obj2 - El segundo objeto.
 * @returns {boolean} True si los objetos se solapan, false de lo contrario.
 */
function boxOverLap(obj1, obj2) {
    return (
        obj1.position.x < obj2.position.x + obj2.width &&
        obj1.position.x + obj1.width > obj2.position.x &&
        obj1.position.y < obj2.position.y + obj2.height &&
        obj1.position.y + obj1.height > obj2.position.y
    );
}