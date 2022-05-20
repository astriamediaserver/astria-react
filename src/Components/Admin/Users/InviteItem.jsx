// @flow
import React from 'react';
import { useAlert } from 'react-alert';

import { copyToClipboard , getFQDNUrl } from 'Helpers';

import { faCopy } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { UserListItem, CopyInvite } from './Styles';

type Props = {
    code: string,
};

const InviteItem = ({ code }: Props) => {
    const alert = useAlert();

    const handleClick = () => {
        copyToClipboard(code);
        alert.success('Copied invite to clipboard');
    };

    const handleURLClick = () => {
        copyToClipboard(`${getFQDNUrl()}/#/register?inviteCode=${code}`);
        alert.success('Copied invite url to clipboard');
    }

    return (
        <UserListItem>
            <ReactTooltip effect="solid" place="right" className="tooltip" delayShow={1000} />
            {code}
            <CopyInvite icon={faCopy} data-tip="Copy Invite Code" onClick={() => handleClick()} />
            <CopyInvite icon={faGlobe} data-tip="Copy Invite URL" onClick={() => handleURLClick()} />
        </UserListItem>
    );
};

export default InviteItem;
