import { useState, useEffect } from 'react'
import { Trophy, CheckCircle, XCircle } from 'lucide-react'
import { formatUSD } from '../utils'
import { generateQuizQuestion, type QuizQuestion } from '../data'

export function Quiz() {
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null)
  const [quizAnswer, setQuizAnswer] = useState<'A' | 'B' | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizTotal, setQuizTotal] = useState(0)

  useEffect(() => {
    if (!quizQuestion) setQuizQuestion(generateQuizQuestion())
  }, [])

  const answerQuiz = (answer: 'A' | 'B') => {
    if (!quizQuestion || quizAnswer) return
    setQuizAnswer(answer)
    setQuizTotal(t => t + 1)
    if (answer === quizQuestion.answer) setQuizScore(s => s + 1)
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Guess Which Country Pays More</h2>
          <p className="mt-2 text-gray-600">Test your intuition about global pricing</p>
          {quizTotal > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
              <Trophy className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">{quizScore}/{quizTotal} correct</span>
            </div>
          )}
        </div>
        {quizQuestion && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">{quizQuestion.product.categoryLabel}</span>
              <h3 className="text-xl font-bold text-gray-900">{quizQuestion.product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{quizQuestion.product.description}</p>
            </div>
            <p className="text-center text-sm font-semibold text-gray-700 mb-6">Which country pays more (in USD)?</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {(['A', 'B'] as const).map(choice => {
                const country = choice === 'A' ? quizQuestion.countryA : quizQuestion.countryB
                const isCorrect = quizAnswer !== null && quizQuestion.answer === choice
                const isWrong = quizAnswer === choice && quizQuestion.answer !== choice
                const priceUSD = choice === 'A' ? quizQuestion.priceA_USD : quizQuestion.priceB_USD
                return (
                  <button key={choice} onClick={() => answerQuiz(choice)} disabled={!!quizAnswer} className={`p-6 rounded-2xl border-2 text-center transition-all ${isCorrect ? 'border-emerald-500 bg-emerald-50' : isWrong ? 'border-red-500 bg-red-50' : quizAnswer ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-indigo-400 hover:shadow-lg'}`}>
                    <span className="text-4xl block mb-2">{country.flag}</span>
                    <span className="font-bold text-gray-900 block">{country.name}</span>
                    {quizAnswer && (<span className="text-sm font-semibold text-gray-600 mt-2 block">{formatUSD(priceUSD)}</span>)}
                    {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mt-2" />}
                    {isWrong && <XCircle className="w-5 h-5 text-red-500 mx-auto mt-2" />}
                  </button>
                )
              })}
            </div>
            {quizAnswer && (
              <div className="text-center">
                <p className={`font-bold mb-4 ${quizAnswer === quizQuestion.answer ? 'text-emerald-600' : 'text-red-600'}`}>
                  {quizAnswer === quizQuestion.answer ? 'Correct!' : 'Not quite!'} {quizQuestion.product.name} costs {formatUSD(Math.max(quizQuestion.priceA_USD, quizQuestion.priceB_USD))} in {quizQuestion.answer === 'A' ? quizQuestion.countryA.name : quizQuestion.countryB.name} vs {formatUSD(Math.min(quizQuestion.priceA_USD, quizQuestion.priceB_USD))} in {quizQuestion.answer === 'A' ? quizQuestion.countryB.name : quizQuestion.countryA.name}.
                </p>
                <button onClick={() => { setQuizQuestion(generateQuizQuestion()); setQuizAnswer(null) }} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all">Next Question</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
