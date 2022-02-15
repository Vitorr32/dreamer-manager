import { Box, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { ApplyFileProtocol } from 'renderer/shared/utils/StringOperations';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface IProps {
    onResourceSelected: (fileName: string, filePath: string) => void;
    rootFolder?: string[];
}

interface ContentView {
    fileName: string;
    filePath: string;
    isDirectory: boolean;
    isImage: boolean;
    extension: string;
}

export function ResourcesSearch({ rootFolder = null, onResourceSelected: onModalSubmit }: IProps) {
    const { t, i18n } = useTranslation();

    const [query, setQuery] = useState<string>();
    const [currentContentView, setContentView] = useState<ContentView[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>();
    const [previousPath, setPreviousPath] = useState<string[]>();

    useEffect(() => {
        async function getCurrentFolderContent() {
            const files = await window.electron.fileSystem.getFilesFromResources(rootFolder || []);

            console.log(files);

            setContentView(files);
            setCurrentPath(rootFolder || null);
        }

        getCurrentFolderContent();
    }, []);

    const navigateIntoFolder = async (folderInfo: ContentView) => {
        const newPath = [...currentPath, folderInfo.fileName];
        const files = await window.electron.fileSystem.getFilesFromResources(newPath);

        setContentView(files);
        setPreviousPath(currentPath);
        setCurrentPath(newPath);
    };

    const stepBackFromFolder = async () => {};

    const onFolderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, clickedFolderInfo: ContentView): void => {
        if (event.detail === 2) {
            navigateIntoFolder(clickedFolderInfo);
        }
    };

    return (
        <Box className="resources">
            <Box className="resources__header">
                <Typography variant="h2" component="h2">
                    {t('interface.tools.flag.title')}
                </Typography>

                <Box className="resources__path">
                    <Typography>{currentPath}</Typography>
                    <OutlinedInput
                        value={query}
                        className="resources__search"
                        placeholder={t('interface.tools.flag.search_placeholder')}
                        onChange={(evt: any) => setQuery(evt.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </Box>
            </Box>
            <Box className="resources__content">
                {currentContentView.map((content) => {
                    if (content.isDirectory) {
                        return (
                            <Box className="resources__folder" onClick={(event) => onFolderClick(event, content)}>
                                <FolderIcon />
                                <Typography>{content.fileName}</Typography>
                            </Box>
                        );
                    } else if (content.isImage) {
                        return (
                            <Box className="resources__image">
                                <img src={ApplyFileProtocol(content.filePath)} />
                                <Typography>{content.fileName}</Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Box className="resources__file">
                                <InsertDriveFileIcon />
                                <Typography>{content.fileName}</Typography>
                            </Box>
                        );
                    }
                })}
            </Box>
        </Box>
    );
}
