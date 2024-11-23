use# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`



import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector} from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";

const ThankYouSurvey = (props: KeyWithAnyModel) => {
const thankyou: KeyWithAnyModel = thankyouData;
const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
const applicationReferenceNo = getUrl.getChannelRefNo().applicationRefNo;
const survey_link = "&p="+stageSelector[0].stageInfo.products[0].product_category+"&m=sg"+"&c="+applicationReferenceNo;

  return (
    <div className="thankyou__feedback">
    {thankyou.Survey.content_1}
    <a target="_blank" 
    rel="feedback noreferrer" 
    href={thankyou.Survey.link+survey_link} >
    {thankyou.Survey.content_2}</a>
    {thankyou.Survey.content_3}
  </div>
  );
};

export default ThankYouSurvey;

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

import React from "react";
import { shallow } from "enzyme";
import { useSelector } from "react-redux";
import ThankYouSurvey from "./thank-you";
import thankyouData from "../../../assets/_json/thankyou.json";
import * as changeUtils from "../../../utils/common/change.utils";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../../../utils/common/change.utils", () => ({
  getUrl: {
    getChannelRefNo: jest.fn(),
  },
}));

describe("ThankYouSurvey Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render ThankYouSurvey component with the correct survey link", () => {
    // Mock `useSelector` to return stageSelector
    (useSelector as jest.Mock).mockReturnValue([
      {
        stageInfo: {
          products: [
            {
              product_category: "CC",
            },
          ],
        },
      },
    ]);

    // Mock `getUrl.getChannelRefNo`
    (changeUtils.getUrl.getChannelRefNo as jest.Mock).mockReturnValue({
      applicationRefNo: "12345",
    });

    // Render the component
    const wrapper = shallow(<ThankYouSurvey />);

    // Verify the rendered content
    expect(wrapper.find(".thankyou__feedback").exists()).toBe(true);
    expect(wrapper.text()).toContain(thankyouData.Survey.content_1);
    expect(wrapper.text()).toContain(thankyouData.Survey.content_2);
    expect(wrapper.text()).toContain(thankyouData.Survey.content_3);

    // Verify the survey link is constructed correctly
    const expectedLink =
      thankyouData.Survey.link +
      "&p=CC&m=sg&c=12345";
    const surveyLink = wrapper.find("a").prop("href");

    expect(surveyLink).toBe(expectedLink);
    expect(wrapper.find("a").prop("target")).toBe("_blank");
    expect(wrapper.find("a").prop("rel")).toBe("feedback noreferrer");
  });
});


import "./thank-you.scss";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import ThankYouSurvey from "./thankyou-survey"
const ThankYouCC = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;

  const getTimelineData = () => {
    
    if (!applicationDetails.isStp) {
      return thankyou[applicationDetails.thankyouProp].CCPL.timeLine;
    }
    return thankyou.CCSTP;
  };
  return (
    <>
      <ThankYouBanner
        banner_header={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_header
            : thankyou.STPCCBanner.banner_header
        }
        banner_content={true}
        // banner_body_1={
        //   !applicationDetails.isStp
        //     ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_1
        //     : ""
        // }
        productName={" "}
        banner_body_2={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_2
            : ""
        }
        resumeUrl={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.resumeUrl
            : ""
        }
      />
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          {!applicationDetails.isStp && (
            <>
              <div className="thankyou__title">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.title}
                </label>
              </div>
              <div className="thankyou__content">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.content}
                </label>
              </div>
            </>
          )}
          {applicationDetails.isStp && (
            <div className="thankyou__title">
              <div>
                {thankyou.STPCCBanner.banner_body_1}
                {applicationDetails.productName}
                {thankyou.STPCCBanner.banner_body_2}
              </div>
              <div>{applicationDetails.productName}</div>
              <div>{applicationDetails.cardNumber}</div>
            </div>
          )}
          <ThankYouTimeline
            title={thankyou[applicationDetails.thankyouText].timeLine}
            data={getTimelineData()}
            checkCompletedStatus={true}
            handleLink={props.showOTPPopup}
          />
          {applicationDetails.isStp && (
            <div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_header}
              </div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_desc}
              </div>
            </div>
          )}
          {!applicationDetails.isStp && (
            <div>
              <div className="thankyou__note__content">
                <label>{thankyou.CCPL.note_title}</label>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_1}</div>
                <div>{thankyou.CCPL.note_content_2}</div>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_3}</div>
                <div>
                  <a
                    target="_blank"
                    rel="feedback noreferrer"
                    href={thankyou.CCPL.note_link}
                  >
                    {thankyou.CCPL.note_content_4}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="body__app-details">
            <label>{thankyou.CCPL.refId_lbl}</label>
            {props.applicationReferenceNo!}
          </div>
          <div className="body__refno">
            {applicationDetails.isStp ? (
              <>
                <button
                  onClick={(e) => props.showContinuePopup(e)}
                  className="thankyou__continue"
                >
                  {thankyou[applicationDetails.thankyouText].continueButton}
                </button>
              </>
            ) : (
              <button
                onClick={(e) => props.submitForm(e)}
                className="thankyou__continue"
              >
                {thankyou[applicationDetails.thankyouText].doneButton}
              </button>
            )}
          </div>
          <ThankYouSurvey/>
        </div>
      </div>   
    </>
  );
};

export default ThankYouCC;

import { render, screen, fireEvent } from '@testing-library/react';
import ThankYouCC from './ThankYouCC';

const mockProps = {
  applicationDetails: {
    isStp: false,
    thankyouProp: 'mockThankYouProp',
    thankyouText: 'mockThankYouText',
    productName: 'Credit Card',
    cardNumber: '1234-5678-9012-3456',
  },
  thankyou: {
    mockThankYouProp: {
      CCPL: {
        timeLine: 'Timeline Data',
        banner_header: 'Mock Header',
        banner_body_2: 'Mock Body 2',
        resumeUrl: '/resume/url',
        title: 'Mock Title',
        content: 'Mock Content',
        note_title: 'Mock Note Title',
        note_content_1: 'Mock Note Content 1',
        note_content_2: 'Mock Note Content 2',
        note_content_3: 'Mock Note Content 3',
        note_content_4: 'Mock Note Content 4',
        note_link: '/mock-note-link',
        refId_lbl: 'Reference ID',
        doneButton: 'Done',
      },
    },
    CCSTP: 'STP Timeline Data',
    STPCCBanner: {
      banner_header: 'STP Header',
      banner_body_1: 'STP Body 1',
      banner_body_2: 'STP Body 2',
    },
    mockThankYouText: {
      timeLine: 'STP Timeline',
      timeline_header: 'STP Timeline Header',
      timeline_desc: 'STP Timeline Description',
      continueButton: 'Continue',
    },
  },
  applicationReferenceNo: 'REF12345',
  showOTPPopup: jest.fn(),
  submitForm: jest.fn(),
  showContinuePopup: jest.fn(),
};

jest.mock('./thankyou-timeline', () => () => <div data-testid="thankyou-timeline" />);
jest.mock('./thankyou-banner', () => () => <div data-testid="thankyou-banner" />);
jest.mock('./thankyou-survey', () => () => <div data-testid="thankyou-survey" />);

describe('ThankYouCC Component', () => {
  test('renders correctly for non-STP flow', () => {
    render(<ThankYouCC {...mockProps} />);

    // Check ThankYouBanner
    expect(screen.getByTestId('thankyou-banner')).toBeInTheDocument();

    // Check title and content
    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Content')).toBeInTheDocument();

    // Check timeline
    expect(screen.getByTestId('thankyou-timeline')).toBeInTheDocument();

    // Check notes
    expect(screen.getByText('Mock Note Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Note Content 1')).toBeInTheDocument();
    expect(screen.getByText('Mock Note Content 4')).toBeInTheDocument();

    // Check reference number
    expect(screen.getByText('REF12345')).toBeInTheDocument();

    // Check Done button
    const doneButton = screen.getByText('Done');
    expect(doneButton).toBeInTheDocument();
    fireEvent.click(doneButton);
    expect(mockProps.submitForm).toHaveBeenCalled();
  });

  test('renders correctly for STP flow', () => {
    const stpProps = {
      ...mockProps,
      applicationDetails: { ...mockProps.applicationDetails, isStp: true },
    };

    render(<ThankYouCC {...stpProps} />);

    // Check ThankYouBanner
    expect(screen.getByTestId('thankyou-banner')).toBeInTheDocument();

    // Check STP timeline details
    expect(screen.getByText('STP Timeline Header')).toBeInTheDocument();
    expect(screen.getByText('STP Timeline Description')).toBeInTheDocument();

    // Check STP banner details
    expect(screen.getByText('STP Body 1')).toBeInTheDocument();
    expect(screen.getByText('STP Body 2')).toBeInTheDocument();

    // Check Continue button
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
    fireEvent.click(continueButton);
    expect(stpProps.showContinuePopup).toHaveBeenCalled();
  });

  test('calls getTimelineData correctly for non-STP', () => {
    render(<ThankYouCC {...mockProps} />);

    // Assert that timeline data from CCPL is used
    expect(screen.getByTestId('thankyou-timeline')).toBeInTheDocument();
  });

  test('calls getTimelineData correctly for STP', () => {
    const stpProps = {
      ...mockProps,
      applicationDetails: { ...mockProps.applicationDetails, isStp: true },
    };

    render(<ThankYouCC {...stpProps} />);

    // Assert that timeline data from CCSTP is used
    expect(screen.getByTestId('thankyou-timeline')).toBeInTheDocument();
  });
});
