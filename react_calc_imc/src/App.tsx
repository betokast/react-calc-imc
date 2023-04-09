import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { GridItem } from './components/gridItem';
import leftArrowImage from './assets/leftarrow.png';

import { levels, calculateImc, Level } from './helpers/imc'

const App = () => {

  const [heighField, setHighField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculate = () => {
    if(heighField && weightField) {
      setToShow(calculateImc(heighField, weightField));
    } else {
      alert("Digite todos os campos!")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHighField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={200} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input
            type="number"
            placeholder="Digite a sua altura. Exemplo: 1.5 (em metros)"
            value={heighField > 0 ? heighField : ''}
            onChange={event => setHighField(parseFloat(event.target.value))}
            disabled={toShow ? true : false}
          />

          <input
            type="number"
            placeholder="Digite o seu peso. Exemplo: 72.5 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={event => setWeightField(parseFloat(event.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculate} disabled={toShow ? true : false}>
            Calcular
          </button>
        </div>

        {/* Right Side */}
        <div className={styles.rightSide}>

          {!toShow &&
            <div className={styles.grid}>
              { levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              )) }
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
