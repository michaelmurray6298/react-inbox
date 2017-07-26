import React from 'react';
import { shallow, render, mount } from 'enzyme';
import toJson, { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { Message, mapStateToProps } from '../components/Message';

function setup() {
  const props = {
    toggleStarred: jest.fn(),
    toggleSelected: jest.fn(),
    selected: false,
    read: false,
    starred: false,
    id: 1,
    labels: [],
    subject: 'Hi',
  };

  const enzymeWrapper = mount(<MemoryRouter>{<Message {...props} />}</MemoryRouter>);
  return {
    props,
    enzymeWrapper,
  };
}

describe('Message', () => {
  it('should change classnames when the message is starred vs unstarred', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.find('#select-button').simulate('change');
    expect(props.toggleSelected).toHaveBeenCalled();
  });

  it('should change classnames when the message is selected vs unselected', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.find('#star-button').simulate('click');
    expect(props.toggleStarred).toHaveBeenCalled();
  });

  it('should change classnames when the message is read vs unread', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('#read-value').props().className).toEqual('row message unread ');
  });

  it('should render', () => {
    const component = shallow(<Message
      selected={false}
      read={false}
      starred={false}
      id={1}
      labels={[]}
      subject={'Hi'}
      location={'/message/1'}
    />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('mapStateToProps', () => {
    const state = {
      messages: [
        {
          id: 1,
          labels: [],
          read: false,
          selected: false,
          starred: false,
          subject: 'Hi',
        },
      ],
    };

    const expectedResult = {
      messages: [
        {
          id: 1,
          labels: [],
          read: false,
          selected: false,
          starred: false,
          subject: 'Hi',
        },
      ],
    };

    expect(mapStateToProps(state)).toEqual(expectedResult);
  });
});
