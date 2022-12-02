import { Box, Button, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { ApplyFileProtocol } from 'renderer/shared/utils/StringOperations';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AreArraysEqual } from 'renderer/shared/utils/General';

interface IProps {
    onResourceSelected: (fileName: string, filePath: string, internalPath: string[]) => void;
    restriction?: RegExp;
    rootFolder?: string[];
}

interface ContentView {
    fileName: string;
    filePath: string;
    isDirectory: boolean;
    isImage: boolean;
    extension: string;
}

export function ResourcesSearch({ rootFolder = null, restriction = null, onResourceSelected }: IProps) {
    const { t, i18n } = useTranslation();

    const [query, setQuery] = useState<string>();
    const [currentContentView, setContentView] = useState<ContentView[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>();
    const [previousPath, setPreviousPath] = useState<string[]>();
    const [selectedFile, setSelectedFile] = useState<ContentView>();

    useEffect(() => {
        async function getCurrentFolderContent() {
            const files = await window.electron.fileSystem.getFilesFromResources(rootFolder || []);

            setContentView(files);
            setCurrentPath(rootFolder || null);
        }

        getCurrentFolderContent();
    }, []);

    const navigateIntoFolder = async (folderInfo: ContentView) => {
        const newPath = [...currentPath, folderInfo.fileName];
        const files = await window.electron.fileSystem.getFilesFromResources(newPath);

        setContentView(sortContentView(files));
        setPreviousPath(currentPath);
        setCurrentPath(newPath);
    };

    const sortContentView = (contentView: ContentView[]): ContentView[] => {
        return contentView.sort((a, b) => (a.isDirectory ? 1 : a.isImage ? 0 : -1));
    };

    const stepBackFromFolder = async () => {
        if (AreArraysEqual(rootFolder, currentPath)) {
            return;
        }

        const newPath = currentPath.slice();
        newPath.pop();

        const files = await window.electron.fileSystem.getFilesFromResources(newPath);

        setContentView(sortContentView(files));
        setPreviousPath(currentPath);
        setCurrentPath(newPath);
    };

    const onFolderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, clickedFolderInfo: ContentView): void => {
        if (event.detail === 2) {
            navigateIntoFolder(clickedFolderInfo);
        }
    };

    const onFileClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, clickedFileInfo: ContentView): void => {
        setSelectedFile(clickedFileInfo);

        //If double click, immediately submit the file
        if (event.detail === 2 && clickedFileInfo === selectedFile) {
            onFileSubmit();
        }
    };

    const onFileSubmit = () => {
        if (restriction && !restriction.test(selectedFile.extension)) {
            //TODO: Error messager
            return;
        }
        onResourceSelected(selectedFile.fileName, selectedFile.filePath, [...currentPath, selectedFile.fileName]);
    };

    return (
        <Box className="resources">
            <Box className="resources__header">
                <Box className="resources__path">
                    <Button onClick={stepBackFromFolder} disabled={AreArraysEqual(rootFolder, currentPath)}>
                        <ArrowBackIcon />
                    </Button>

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
                            <Box
                                key={`content_${content.fileName}`}
                                className={`resources__file resources__file-folder${selectedFile === content ? ' selected' : ''}`}
                                onClick={(event) => onFolderClick(event, content)}
                            >
                                <FolderIcon />
                                <Typography className="resources__file-name">{content.fileName}</Typography>
                            </Box>
                        );
                    } else if (content.isImage) {
                        return (
                            <Box
                                key={`content_${content.fileName}`}
                                className={`resources__file resources__file-image${selectedFile === content ? ' selected' : ''}`}
                                onClick={(event) => onFileClick(event, content)}
                            >
                                <img src={ApplyFileProtocol(content.filePath)} />
                                <Typography className="resources__file-name">{content.fileName}</Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Box
                                key={`content_${content.fileName}`}
                                className={`resources__file resources__file-file${selectedFile === content ? ' selected' : ''}`}
                                onClick={(event) => onFileClick(event, content)}
                            >
                                <InsertDriveFileIcon />
                                <Typography className="resources__file-name">{content.fileName}</Typography>
                            </Box>
                        );
                    }
                })}
            </Box>
            <Button onClick={onFileSubmit} disabled={!selectedFile}>
                {t('interface.commons.submit')}
            </Button>
        </Box>
    );
}
