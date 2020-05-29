import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='name' cost='cost' days={1} tags={[1, 2]} />);

    expect(component).toBeTruthy();
    //console.log(component.debug());
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should generate correct link', () => {
    const expectedLink = 'abc';
    const component = shallow(<TripSummary id={expectedLink} image='image.jpg' name='name' cost='cost' days={1} tags={[1, 2]} />);

    expect(component.find('.link').prop('to')).toEqual(`/trip/${expectedLink}`);
  });

  it('should render correct image "src" and "alt"', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'image0';
    const component = shallow(<TripSummary id={1} image={expectedSrc} name={expectedAlt} cost='cost' days={1} tags={[1, 2]} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props', () =>{
    const expectedName = 'name';
    const expectedDays = 1;
    const expectedCost = 'cost';
    const component = shallow(<TripSummary id={1} image='image.jpg' name={expectedName} days={expectedDays} cost={expectedCost} tags={[1, 2]} />);

    const renderedName = component.find('.title').text();
    const renderedDays = component.find('.details').childAt(0).text();
    const renderedCost = component.find('.details').childAt(1).text();

    expect(renderedName).toEqual(expectedName);
    expect(renderedDays).toEqual(`${expectedDays} days`);
    expect(renderedCost).toEqual(`from ${expectedCost}`);
  });

  it('should render correct tags', () => {
    const expectedTags = ['1', '2', '3'];
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='name' cost='cost' days={1} tags={expectedTags} />);

    for(let i in expectedTags){
      const renderedTag = component.find('.tag').at(i).text();
      expect(renderedTag).toEqual(expectedTags[i]);
      //console.log('checked tag:', i);
    }
  });

  it('should throw error without required tags', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='name' cost='cost' days={1} tags={[]} />);
    const checkedDiv = component.find('.tags').exists();
    expect(checkedDiv).toEqual(false);
  });

});
