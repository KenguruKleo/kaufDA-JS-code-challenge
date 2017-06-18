import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import OfferProperties from './offer_properties';

function setup() {

    const props = {
        reducedPrice: 888,
        originalPrice: 999,
        productImagePointer: {itemName: "image.jpg"},
        toggleShowDetails: jest.fn(),
        showDetails: true,
        id: "123456",
        parentId: "789"
    };

    const enzymeWrapper = mount(
        <OfferProperties {...props} />
    );

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('OfferProperties', () => {

        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();

            expect(enzymeWrapper.find('Form').length).toBe(1);
            expect(enzymeWrapper.find('PriceProposal').length).toBe(2);
            expect(enzymeWrapper.find('Image').length).toBe(1);

        });

        it('should call toggleShowDetails by clicking on Button', () => {
            const { enzymeWrapper, props } = setup();
            const button = enzymeWrapper.find('Button');
            button.simulate('click');
            expect(props.toggleShowDetails).toBeCalledWith("789", "123456");
        });

    })
});