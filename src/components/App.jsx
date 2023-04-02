import { Component } from 'react';
import Section from './Section';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import css from './App.module.css';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClickButton = e => {
    const option = e.target.name;

    if (option) {
      this.setState(prevState => ({ [option]: prevState[option] + 1 }));
    }
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedback = () => {
    const totalFeedback = this.countTotalFeedback();
    const { good } = this.state;
    const result = Math.ceil((good / totalFeedback) * 100) || 0;

    return `${result}%`;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const countTotalFeedback = this.countTotalFeedback();
    const countPositiveFeedbackPercentage = this.countPositiveFeedback();
    const options = Object.keys(this.state);
    const handleClickButton = this.handleClickButton;

    return (
      <div className={css.container}>
        <div className={css.wrapper}>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={options}
              onLeaveFeedback={handleClickButton}
            />
          </Section>

          <Section title="Statistics">
            {countTotalFeedback > 0 ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback}
                positivePercentage={countPositiveFeedbackPercentage}
              />
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
        </div>
      </div>
    );
  }
}

export default App;
