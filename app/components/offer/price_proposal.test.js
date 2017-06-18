import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import PriceProposal from './price_proposal';

function setup() {

    const props = {
        priceName: "Price name",
        amount: 123,
        currencyCode: "USD"
    };

    const enzymeWrapper = mount(
        <PriceProposal {...props} />
    );

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('PriceProposal', () => {

        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();

            const cols = enzymeWrapper.find('Col');
            expect(cols.length).toBe(3);
            expect(cols.at(0).text()).toBe("Price name");
            expect(enzymeWrapper.find('FormControl').at(0).props().value).toBe(123);
            expect(enzymeWrapper.find('FormControl').at(1).props().value).toBe("USD");

        });

    })
});