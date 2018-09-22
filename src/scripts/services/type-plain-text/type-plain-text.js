const _public = {};

_public.type = (container, text, onComplete) => {
  const letters = text.split('');
  const letter = letters.shift();
  if(letter)
    appendLetter(container, letter, letters, onComplete);
  else
    onComplete();
};

function appendLetter(container, letter, letters, onComplete){
  container.append(letter);
  setTimeout(() => {
    _public.type(container, letters.join(''), onComplete);
  }, 75);
}

export default _public;
