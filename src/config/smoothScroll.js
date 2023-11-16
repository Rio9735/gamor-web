/*
 * Ejemplo de uso:
 * const handleScroll = (e) => {
 *  var target = e.deltaY < 0 ? 0 : document.body.scrollHeight;
 *  smoothScroll(target, 2000);
 *};
 */

/*
 * Parámetros de la función smoothScroll:
 *
 * target - Es el objetivo de desplazamiento. Si `target` es 0, la animación se desplazará hacia el principio de la página. De lo contrario, la animación se desplazará hacia el final de la página.
 *
 * duration - Es la duración total de la animación de desplazamiento en milisegundos. Si `target` es 0, la duración de la animación se reduce a la mitad, ya que generalmente se necesita menos tiempo para desplazarse hacia el principio de la página que hacia el final.
 */
export default function smoothScroll(target, duration) {
  var targetPosition = target === 0 ? 0 : document.body.scrollHeight;
  var startPosition = window.scrollY;
  var distance = targetPosition - startPosition;
  var startTime = null;
  var scrolling = false;
  var lastScrollDirection = null; // Nueva variable para rastrear la dirección del último movimiento de la rueda del mouse

  function stopScrolling() {
    scrolling = false;
  }

  // Función para permitir hacer zoom sin que se active el desplazamiento
  function preventScroll(e) {
    if (e.ctrlKey) {
      stopScrolling();
    }
  }

  // Nueva función para manejar el evento de la rueda del mouse
  function handleWheel(e) {
    var currentScrollDirection = Math.sign(e.deltaY); // Determinar la dirección del movimiento actual de la rueda del mouse
    if (
      lastScrollDirection !== null &&
      lastScrollDirection !== currentScrollDirection
    ) {
      stopScrolling(); // Si la dirección del movimiento actual es diferente a la última dirección registrada, detener el desplazamiento suave
    }
    lastScrollDirection = currentScrollDirection; // Actualizar la dirección del último movimiento de la rueda del mouse
    preventScroll(e); // Prevenir el desplazamiento predeterminado del navegador
  }

  function animation(currentTime) {
    if (!scrolling) return;
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  /*
   * Función de aceleración 'ease' para suavizar la animación de desplazamiento.
   *
   * Parámetros:
   * t - Tiempo actual de la animación, que varía de 0 a d.
   * b - Posición inicial de la animación.
   * c - Distancia total de desplazamiento durante la animación.
   * d - Duración total de la animación.
   *
   * La función devuelve la posición de desplazamiento en el tiempo 't'.
   *
   * Utiliza una ecuación de interpolación cúbica para crear un efecto de aceleración suave al principio y al final de la animación, con una aceleración más rápida en el medio.
   */
  function ease(t, b, c, d) {
    t /= d;
    var ts = t * t;
    var tc = ts * t;
    return b + c * (20 * tc * ts + -15 * ts * ts + 10 * tc);
  }

  if (target === 0) {
    duration /= 2;
  }

  scrolling = true;
  // Agregar controladores de eventos para prevenir el desplazamiento durante la animación y detener la animación si el usuario hace clic o toca la pantalla
  window.addEventListener("wheel", handleWheel, { passive: false }); // Modificado para usar la nueva función handleWheel
  window.addEventListener("mousedown", stopScrolling);
  window.addEventListener("touchstart", stopScrolling);
  // Solicitar el primer cuadro de la animación
  requestAnimationFrame(animation);

  // Limpiar los controladores de eventos cuando el componente se desmonte
  return () => {
    window.removeEventListener("wheel", handleWheel); // Modificado para usar la nueva función handleWheel
    window.removeEventListener("mousedown", stopScrolling);
    window.removeEventListener("touchstart", stopScrolling);
  };
}
