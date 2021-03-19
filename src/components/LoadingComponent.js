import React from 'react';
//check the nice loading spinner! <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
export const Loading = () => {
    return (
        <div className="col">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
            <p>Loading...</p>
        </div>
    );
};