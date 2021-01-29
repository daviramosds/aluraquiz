import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit
}) {
  const questionId = `question__${questionIndex}`
  return (
    <Widget>
    <Widget.Header>
      <h3>
      {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
      </h3>
    </Widget.Header>
    <img
      alt="Descrição"
      style={{
        width: '100%',
        height: '150px',
        objectFit: 'cover',
      }}
      src={question.image}
    />

    <Widget.Content>
      <h2>{question.title}</h2>

      <p>{question.description}</p>

      <form
        onSubmit={(infosDoEvento) => {
          infosDoEvento.preventDefault()
          onSubmit()
        }}
      >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          return (
            <Widget.Topic
              as="label"
              htmlFor={alternativeId}
            >

              <input
              style={{display: 'none'}}
                id={alternativeId}
                name={questionId}
                type="radio"
              />

              {alternative}

            </Widget.Topic>
          )

        })}
        
        <Button type="submit">Confirmar</Button>

      </form>



    </Widget.Content>
  </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const totalQuestions = db.questions.length
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (

    <QuizBackground backgroundImage={db.bg}>
      <GitHubCorner />
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.QUIZ && (
          <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
        />)}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
