import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LANGUAGE_CODES } from 'renderer/shared/Constants';
import { getLocaleLabel } from 'renderer/shared/utils/Localization';
import { useEffect, useState } from 'react';
import { Event } from 'renderer/shared/models/base/Event.model';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { EventNode } from 'renderer/shared/components/events/EventNode.component';
import { Tree } from '@visx/hierarchy';
import { Scene } from 'renderer/shared/models/base/Scene.model';
import { Group } from '@visx/group';
import { LinkHorizontal } from '@visx/shape';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';
import { EditableScene } from 'renderer/shared/components/scene/EditableScene';

interface IProps {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

const lightpurple = '#374469';
export const background = '#272b4d';

const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };

export function NewEvent({ width = window.innerWidth - 100, height = 500, margin = defaultMargin }: IProps) {
    const { t, i18n } = useTranslation();
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    const [editedNode, setEditedNode] = useState<Scene | null>(null);
    const [newEvent, setNewEvent] = useState(new Event(undefined, '', { condition: new ConditionTree(), queryActorsConditions: [] }));
    const [newVN, setVN] = useState<VisualNovel>(null);
    const [tempImagesPath, setTempImagesPaths] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const visualNovel = Object.assign(new VisualNovel(), newVN);

        const rootScene = new Scene();
        const childScene = new Scene();

        visualNovel.addScene(null, rootScene);
        visualNovel.addScene(rootScene, childScene);

        setVN(visualNovel);
    }, []);

    const onAddNode = (parent: Scene) => {
        const visualNovel = Object.assign(new VisualNovel(), newVN);

        visualNovel.addScene(parent, new Scene());

        setVN(visualNovel);
    };

    const onRemoveNode = (scene: Scene, parent: Scene) => {
        const visualNovel = Object.assign(new VisualNovel(), newVN);

        visualNovel.removeScene(parent, scene);

        setVN(visualNovel);
    };

    const onNodeSelected = (scene: Scene) => {
        setEditedNode(scene);
    };

    const onNodeEdited = (scene: Scene) => {
        const visualNovel = Object.assign(new VisualNovel(), newVN);

        visualNovel.updateScene(scene);

        setVN(visualNovel);
        setEditedNode(null);
    };

    return (
        <Box className="new-event">
            <Box component="header" className="new-event__header">
                <Link to="/menu/edit">
                    <Button color="primary">
                        <ArrowBackIcon />
                    </Button>
                </Link>
                <h2>Event Creation</h2>

                <TextField
                    required
                    label={t('interface.commons.language')}
                    value={i18n.language}
                    variant="outlined"
                    select
                    onChange={(event) => i18n.changeLanguage(event.target.value)}
                >
                    {LANGUAGE_CODES.map((value) => {
                        return (
                            <MenuItem key={`language_${value}`} value={value}>
                                {getLocaleLabel(value)}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </Box>
            <Box component="main" className="new-event__content">
                <Button color="primary">Add Visual Novel</Button>
                {newVN && newVN.getVISXHierarchyOfVN() && (
                    <svg className="new-event__flow" width={width} height={height}>
                        <rect width={width} height={height} rx={14} fill={background} />
                        <Tree<Scene> root={newVN.getVISXHierarchyOfVN()} size={[yMax, xMax]}>
                            {(tree) => (
                                <Group top={margin.top} left={margin.left}>
                                    {tree.links().map((link, i) => (
                                        <LinkHorizontal key={`link-${i}`} data={link} stroke={lightpurple} strokeWidth="1" fill="none" />
                                    ))}
                                    {tree.descendants().map((node, i) => (
                                        <EventNode key={`node-${i}`} node={node} onAddNode={onAddNode} onNodeSelected={onNodeSelected} onRemoveNode={onRemoveNode} />
                                    ))}
                                </Group>
                            )}
                        </Tree>
                    </svg>
                )}
            </Box>

            <Modal className="modal" open={editedNode !== null} onClose={() => setEditedNode(null)}>
                <Box className="modal__wrapper">
                    <Box className="modal__header">Header</Box>
                    <Box className="modal__content">
                        <EditableScene scene={editedNode} onSceneEdited={onNodeEdited} pathOfTempImages={tempImagesPath} setPathOfTempImages={setTempImagesPaths} />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
