import { Box, Button, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { ApplyFileProtocol } from 'renderer/shared/utils/StringOperations';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AreArraysEqual } from 'renderer/shared/utils/General';
import { Package } from 'renderer/shared/models/files/Package.model';
import { GetPathInPackage } from 'renderer/shared/utils/FileOperation';

interface IProps {
    onResourceSelected: (fileName: string, absolutePath: string, relativePath: string[], packageData: Package) => void;
    onClose: () => void;
    isOpen: boolean;
    targetPackage: Package;
    restriction?: RegExp;
    rootFolder?: string[];
}

interface ContentView {
    fileName: string;
    absolutePath: string;
    isDirectory: boolean;
    isImage: boolean;
    extension: string;
}

const style = {};

export function StaticResourceSelection({ rootFolder = null, isOpen = false, onClose, targetPackage, restriction = null, onResourceSelected }: IProps) {
    const { t, i18n } = useTranslation();

    const [query, setQuery] = useState<string>();
    const [currentContentView, setContentView] = useState<ContentView[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>();
    const [previousPath, setPreviousPath] = useState<string[]>();
    const [selectedFile, setSelectedFile] = useState<ContentView>();
    const [selectedPackage, setSelectedPackage] = useState<Package>(targetPackage);

    useEffect(() => {
        console.log('targetPackage', targetPackage);
        const finalPath = GetPathInPackage(targetPackage, rootFolder);

        async function getCurrentFolderContent() {
            const files = await window.electron.fileSystem.getFilesInPath(finalPath);

            if ('error' in files) {
                console.error('Error getting folder content', files.error);
                return;
            }

            setContentView(files);
            setCurrentPath(finalPath);
        }

        getCurrentFolderContent();
    }, []);

    const navigateIntoFolder = async (folderInfo: ContentView) => {
        const newPath = [...currentPath, folderInfo.fileName];
        const files = await window.electron.fileSystem.getFilesInPath(newPath);

        if ('error' in files) {
            console.error('Error getting folder content', files.error);
            return;
        }

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

        const files = await window.electron.fileSystem.getFilesInPath(newPath);

        if ('error' in files) {
            console.error('Error getting folder content', files.error);
            return;
        }

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

        // If double click, immediately submit the file
        if (event.detail === 2 && clickedFileInfo === selectedFile) {
            onFileSubmit();
        }
    };

    const onFileSubmit = () => {
        if (restriction && !restriction.test(selectedFile.extension)) {
            console.error(`File did not match restriction:${  selectedFile.fileName  } restriction: ${  restriction}`);
            return;
        }
        onResourceSelected(selectedFile.fileName, selectedFile.absolutePath, [...currentPath, selectedFile.fileName], selectedPackage);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    color: 'text.primary',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.default',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                    {currentPath?.join(' / ') || ''}
                </Typography>
                <Box sx={{ display: 'flex', marginTop: '20px' }}>
                    <Button onClick={stepBackFromFolder} disabled={AreArraysEqual(rootFolder, currentPath)}>
                        <ArrowBackIcon />
                    </Button>

                    <TextField
                        sx={{ flex: 1 }}
                        variant="outlined"
                        value={query}
                        label={t('interface.tools.components.static_resource_search_label')}
                        placeholder={t('interface.tools.components.static_resource_search_placeholder')}
                        onChange={(evt: any) => setQuery(evt.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
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
                        } if (content.isImage) {
                            return (
                                <Box
                                    key={`content_${content.fileName}`}
                                    className={`resources__file resources__file-image${selectedFile === content ? ' selected' : ''}`}
                                    onClick={(event) => onFileClick(event, content)}
                                >
                                    <img src={ApplyFileProtocol(content.absolutePath)} />
                                    <Typography className="resources__file-name">{content.fileName}</Typography>
                                </Box>
                            );
                        } 
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
                        
                    })}
                </Box>
                <Button onClick={onFileSubmit} disabled={!selectedFile}>
                    {t('interface.commons.submit')}
                </Button>
            </Box>
        </Modal>
    );
}
