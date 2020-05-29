import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='title' type='dropdown' id='1' />);

    expect(component).toBeTruthy();
    //console.log(component.debug());
  });

  it('should return empty object if called qithout required props', () => {
    const component = shallow(<OrderOption />);

    expect(component).toEqual({});
  });

  it('should render title name', () => {
    const expectedTitle = 'title';
    const component = shallow(<OrderOption name={expectedTitle} type='dropdown' id='1' />);

    const renderedTitle = component.find('.title').text();

    expect(renderedTitle).toEqual(expectedTitle);
  });

  const optionTypes = {
    checkboxes: 'OrderOptionCheckboxes',
    date: 'OrderOptionDate',
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
  };

  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };

  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: 1},
    text: {},
    date: {},
  };

  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for(let type in optionTypes){
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });

      /* common tests */
      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
      });

      /* type-specific tests */
      switch (type) {
        case 'checkboxes': {
          it('contains div and input', () => {
            const divCheckboxes = renderedSubcomponent.find('.checkboxes');
            expect(divCheckboxes.length).toBe(1);

            const checkboxesInput = renderedSubcomponent.find('input[type="checkbox"]');
            expect(checkboxesInput.length).toBe(mockProps.values.length);
            expect(checkboxesInput.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(checkboxesInput.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {

            renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});

          });
          break;
        }

        case 'date': {
          it('contains div and datePicker', () => {
            const div = renderedSubcomponent.find('div');
            expect(div.length).toBe(1);
            const datePicker = renderedSubcomponent.find(DatePicker);
            expect(datePicker.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find(DatePicker).simulate('change', testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
          });
          break;
        }

        case 'dropdown': {
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
          });
          break;
        }

        case 'icons' : {
          it('contains divs', () => {
            const divDropdown = renderedSubcomponent.find('.dropdown');
            expect(divDropdown.length).toBe(1);

            const emptyDivIcon = divDropdown.find('div[value=""]');
            expect(emptyDivIcon.length).toBe(1);

            const divIcon = divDropdown.find('div').not('[value=""]');
            expect(divIcon.length).toBe(mockProps.values.length + 1);
            //console.log(divIcon.length);  //why 3 not 2?
            //console.log(divIcon.debug()); //why show value="" (first div)
            //console.log(divIcon.at(0).debug()); // what's that and how?

            expect(divIcon.at(1).prop('value')).toBe(mockProps.values[0].id); //should be at(0)
            expect(divIcon.at(2).prop('value')).toBe(mockProps.values[1].id); //should be at(1)

          });

          it('should run setOrderOption function on click', () => {
            renderedSubcomponent.find('.icon').last().simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
          });
          break;
        }

        case 'number': {
          it('contains div and input', () => {
            const div = renderedSubcomponent.find('div');
            expect(div.length).toBe(1);

            const input = renderedSubcomponent.find('input');
            expect(input.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValueNumber});
          });
          break;
        }

        case 'text': {
          it('contains div and input', () => {
            const div = renderedSubcomponent.find('div');
            expect(div.length).toBe(1);

            const input = renderedSubcomponent.find('input');
            expect(input.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
          });
          break;
        }
      }
    });
  }

});
