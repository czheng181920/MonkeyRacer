import styles from "./Word.module.css";

//following the style of MonkeyType
const Word = ({targetWord, inputWord}) => {
  let word = targetWord.split('').map((letter, index) => {
    if( index >= inputWord.length) {
      return <span key={index} className={styles.inactive}>{letter}</span>
    } else if(targetWord[index] !== inputWord[index]) {
      return <span key={index} className={styles.wrong}>{targetWord[index]}</span>
    } else {
      // else targetWord[index] === inputWord[index])
      return <span key={index} className={styles.correct}>{letter}</span>
    }
  })

  if(inputWord.length > targetWord.length){
    inputWord.substring(targetWord.length, inputWord.length+1).split('').forEach((letter, index) => {
      word.push(
        <span key={index + targetWord.length} className={styles.extraWrong}>{letter}</span>
      )
    })
  }
  console.log(word);
  return word;
}

export default Word;