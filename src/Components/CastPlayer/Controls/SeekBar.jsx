import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedTime } from 'react-player-controls';

import { setCastPlaystate } from 'Redux/Actions/castActions';

import { SeekBarWrap, SeekBarSlider, SliderHandle, SliderBar } from './Styles';

class SeekBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeeking: false,
            isEnabled: true,
            direction: 'HORIZONTAL',
            value: 0,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { isSeeking } = prevState;
        const { playtime, total } = nextProps.playstate;

        if (isSeeking) return {};

        return {
            value: playtime === 0 ? 0 : (100 * playtime) / total / 100,
        };
    }

    seeking = (value) => {
        const { setCastPlaystate, playstate } = this.props;

        this.setState({ value });

        setCastPlaystate({
            playtime: value * playstate.total,
        });
    };

    seekStart = () => {
        const { playPause, isPaused } = this.props;

        this.setState({ isSeeking: true });

        if (!isPaused) playPause();
    };

    seekEnd = (val) => {
        const { playPause, isPaused, seek } = this.props;
        const { isSeeking } = this.state;

        if (isPaused) playPause();
        if (isSeeking) seek(val);

        this.setState({ isSeeking: false });
    };

    isNumber = (val) => !Number.isNaN(parseFloat(val));

    render() {
        const { playstate } = this.props;
        const { direction, isEnabled, value } = this.state;

        if (!this.isNumber(value)) this.setState({ value: 0 });

        return (
            <SeekBarWrap>
                <FormattedTime numSeconds={playstate.playtime} />
                <SeekBarSlider
                    direction={direction}
                    isEnabled={isEnabled}
                    onChangeStart={() => this.seekStart()}
                    onChange={(newValue) => this.seeking(newValue)}
                    onChangeEnd={(endValue) => this.seekEnd(endValue * playstate.total)}
                >
                    <SliderBar direction={direction} value={value} />
                    <SliderHandle direction={direction} value={value} />
                </SeekBarSlider>

                <FormattedTime numSeconds={playstate.total} />
            </SeekBarWrap>
        );
    }
}

SeekBar.propTypes = {
    playstate: PropTypes.shape({
        playtime: PropTypes.number,
        total: PropTypes.number,
        volume: PropTypes.number,
    }),
    setCastPlaystate: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
    playPause: PropTypes.func.isRequired,
    isPaused: PropTypes.bool,
};

SeekBar.defaultProps = {
    isPaused: false,
    playstate: {
        playtime: 0,
        total: 0,
        volume: 1,
    },
};

const mapDispatchToProps = (dispatch) => ({
    setCastPlaystate: (playstate) => dispatch(setCastPlaystate(playstate)),
});

export default connect(
    null,
    mapDispatchToProps,
)(SeekBar);
