import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function StartUpPage() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (!params) {
            return;
        }
        console.log(params);

        const {} = params;
        // if (callbackRedirect && !isLoading) {
        // }
    }, [params]);

    return <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'primary.main' }}>Loading....</Box>;
}
