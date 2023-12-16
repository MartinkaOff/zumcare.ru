import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CloseButton } from 'react-bootstrap';

export function notificationToast(text) {
    toast.loading((t) => (
        <span style={{ display: 'flex' }}>
            {text}
            <CloseButton style={{ padding: '1px' }} onClick={() => toast.dismiss(t.id)} />
        </span>
    ));
}
