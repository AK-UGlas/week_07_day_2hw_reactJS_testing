import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Calculator', () => {
  let container = null;
  beforeEach(() => {
    container = render(<App/>)
  });

  it('should change running total on number enter', () => {
    const button4 = container.getByTestId('number4');
    const runningTotal = container.getByTestId('running-total');
    fireEvent.click(button4);
    expect(runningTotal).toHaveTextContent('4');
  });

  it('should add two numbers', () => {
    const btn1 = container.getByTestId('number1');
    const btn4 = container.getByTestId('number4');
    const addbtn = container.getByTestId('add');
    const eql = container.getByTestId('equals');
    const runningTotal = container.getByTestId('running-total');

    // pressing 1 + 4 =
    fireEvent.click(btn1);
    fireEvent.click(addbtn);
    fireEvent.click(btn4);
    fireEvent.click(eql);

    expect(runningTotal).toHaveTextContent('5');
  })

  it('should subtract two numbers', () => {
    const btn7 = container.getByTestId('number7');
    const btn4 = container.getByTestId('number4');
    const subtractbtn = container.getByTestId('subtract');
    const eql = container.getByTestId('equals');
    const runningTotal = container.getByTestId('running-total');

    //press "7 - 4 = "
    fireEvent.click(btn7);
    fireEvent.click(subtractbtn);
    fireEvent.click(btn4);
    fireEvent.click(eql);

    expect(runningTotal).toHaveTextContent('3');
  });

  it('should multiply two numbers', () => {
    const btn3 = container.getByTestId('number3');
    const btn5 = container.getByTestId('number5');
    const multbtn = container.getByTestId('multiply');
    const eql = container.getByTestId('equals');
    const runningTotal = container.getByTestId('running-total');

    //press "3 x 5 = "
    fireEvent.click(btn3);
    fireEvent.click(multbtn);
    fireEvent.click(btn5);
    fireEvent.click(eql);

    expect(runningTotal).toHaveTextContent('15');
  });

  it('should divide two numbers', () => {
      const btn2 = container.getByTestId('number2');
      const btn1 = container.getByTestId('number1');
      const btn7 = container.getByTestId('number7');
      const dividebtn = container.getByTestId('divide');
      const eql = container.getByTestId('equals');
      const runningTotal = container.getByTestId('running-total');
  
      // press "2 1 / 7 = "
      fireEvent.click(btn2);
      fireEvent.click(btn1);
      fireEvent.click(dividebtn);
      fireEvent.click(btn7);
      fireEvent.click(eql);
  
      expect(runningTotal).toHaveTextContent('3');
  });

  it('should be able to string multiple number button clicks', () => {
      const btn2 = container.getByTestId('number2');
      const btn1 = container.getByTestId('number1');
      const btn7 = container.getByTestId('number7');
      const btn3 = container.getByTestId('number3');
      const runningTotal = container.getByTestId('running-total');

      // press " 2 1 7 3 "
      fireEvent.click(btn2);
      fireEvent.click(btn1);
      fireEvent.click(btn7);
      fireEvent.click(btn3);

      expect(runningTotal).toHaveTextContent('2173');

  });

  it('should be able to chain multiple operations', () => {
      const btn2 = container.getByTestId('number2');
      const btn5 = container.getByTestId('number5');
      const btn7 = container.getByTestId('number7');
      const btn3 = container.getByTestId('number3');
      const multbtn = container.getByTestId('multiply');
      const runningTotal = container.getByTestId('running-total');
      const eql = container.getByTestId('equals');

      // press "2 x 5 = x 7 = x 3"
      // trying "2 x 5 x 7 x 3 =" fails, returns 21 (the result of the last 2 items entered into the calculation)"
      fireEvent.click(btn2);
      fireEvent.click(multbtn);
      fireEvent.click(btn5);
      fireEvent.click(eql);
      fireEvent.click(multbtn);
      fireEvent.click(btn7);
      fireEvent.click(eql);
      fireEvent.click(multbtn);
      fireEvent.click(btn3);
      fireEvent.click(eql);
      
      expect(runningTotal).toHaveTextContent('210');
  });

  it('should be able to clear running total but leave calculation unaffected', () => {
      const btn2 = container.getByTestId('number2');
      const btn5 = container.getByTestId('number5');
      const btn7 = container.getByTestId('number7');
      const multbtn = container.getByTestId('multiply');
      const runningTotal = container.getByTestId('running-total');
      const eql = container.getByTestId('equals');
      const clear = container.getByTestId('clear');

      // press "2 x 5 C 7 =" should replace 5 with 7 for "2 x 7 ="
      fireEvent.click(btn2);
      fireEvent.click(multbtn);
      fireEvent.click(btn5);
      fireEvent.click(clear);
      fireEvent.click(btn7);
      fireEvent.click(eql);

      expect(runningTotal).toHaveTextContent('14');
  });


});

