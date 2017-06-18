import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import Offer from './offer';

function setup() {

    const mockStore = configureMockStore();
    const store = mockStore({
        parentsReducer: {},
        offerDetails: []
    });

    const props = {
        toggleShowDetails: jest.fn(),
        showDetails: true,
        properties: {
            name: "Test name",
            productImagePointer: {}
        }
    };

    const enzymeWrapper = mount(
        <Provider store={store}>
            <Offer {...props} />
        </Provider>
    );

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('Offer', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();

            expect(enzymeWrapper.find('h3').at(0).text()).toBe('Test name');

            const todoInputProps = enzymeWrapper.find('OfferProperties').props();
            expect(todoInputProps.showDetails).toBe(true);

        });

    })
});