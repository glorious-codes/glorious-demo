const _public = {};

_public.type = (container, text, onComplete) => {
  const letters = text.split('');
  const letter = letters.shift();
  if(letter) {
    container.append(letter);
    setTimeout(() => {
      _public.type(container, letters.join(''), onComplete);
    }, 75);
  } else {
    onComplete();
  }
}

export default _public;
