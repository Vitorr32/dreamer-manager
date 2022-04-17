import { Box, Button, MenuItem, Modal, TextField, Tooltip, Typography } from '@mui/material';
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
import { ConnectionType, Scene, SceneConnection } from 'renderer/shared/models/base/Scene.model';
import { Group } from '@visx/group';
import { LinkHorizontal } from '@visx/shape';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';
import { EditableScene } from 'renderer/shared/components/scene/EditableScene';
import { ActorsCasting } from 'renderer/shared/components/scene/ActorsCasting';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { EventLinkModal } from './EventLinkModal.component';
import { HierarchyPointLink } from '@visx/hierarchy/lib/types';

interface IProps {
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

const lightpurple = '#374469';
export const background = '#272b4d';

const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };

export function NewEvent({ width = window.innerWidth - 100, height = 500, margin = defaultMargin }: IProps) {
    const { t, i18n } = useTranslation();
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal({
        scroll: true,
        detectBounds: true,
    });
    const { showTooltip, updateTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft = 0, tooltipTop = 0 } = useTooltip();

    const [editedNode, setEditedNode] = useState<Scene | null>(null);
    const [newEvent, setNewEvent] = useState(new Event(undefined, '', { condition: new ConditionTree(), queryActorsConditions: [] }));
    const [newVN, setVN] = useState<VisualNovel>(null);
    const [tempImagesPath, setTempImagesPaths] = useState<{ [key: string]: string }>({});
    const [eventLinkEditInfo, setEventLinkEditInfo] = useState<{ source: Scene; target: Scene; connection: SceneConnection }>();

    useEffect(() => {
        const visualNovel = Object.assign(new VisualNovel(), newVN);

        const rootScene = new Scene();
        const childScene = new Scene();

        visualNovel.addScene(null, rootScene);
        visualNovel.addScene(rootScene, childScene);

        setVN(visualNovel);
    }, []);

    const onAddNode = (parent: Scene) => {
        const visualNovel = CopyClassInstance(newVN);

        visualNovel.addScene(parent, new Scene());

        setVN(visualNovel);
    };

    const onRemoveNode = (scene: Scene, parent: Scene) => {
        const visualNovel = CopyClassInstance(newVN);

        visualNovel.removeScene(parent, scene);

        setVN(visualNovel);
    };

    const onNodeSelected = (scene: Scene) => {
        setEditedNode(scene);
    };

    const onNodeEdited = (scene: Scene, closeModal: boolean = false) => {
        const visualNovel = CopyClassInstance(newVN);

        visualNovel.updateScene(scene);

        setVN(visualNovel);
        if (closeModal) {
            setEditedNode(null);
        } else {
            setEditedNode(scene);
        }
    };

    const onConnectionEdited = (sceneConnection: SceneConnection, closeModal: boolean = false) => {
        const visualNovel = CopyClassInstance(newVN);

        const parentScene = eventLinkEditInfo.source;
        const childScene = eventLinkEditInfo.target;
        const connectionIndex = parentScene.sceneConnections.findIndex((connection) => connection.resultingScene === childScene.id);

        if (connectionIndex === -1) {
            console.error('onConnectionEdited() - Connection to a empty child scene');
            return;
        }

        const newScene = CopyClassInstance(parentScene);
        newScene.sceneConnections[connectionIndex] = sceneConnection;

        visualNovel.updateScene(newScene);
        setVN(visualNovel);

        if (closeModal) {
            setEventLinkEditInfo(null);
        } else {
            setEventLinkEditInfo({ source: newScene, connection: sceneConnection, target: eventLinkEditInfo.target });
        }
    };

    const onEventLinkMouseOver = () => {
        showTooltip({ tooltipData: 'Link Horizontal' });
    };

    const onEventLinkMouseExit = () => {
        hideTooltip();
    };

    const onEventLinkClick = (linkData: HierarchyPointLink<Scene>) => {
        const connectionIndex = linkData.source.data.sceneConnections.findIndex((connection) => connection.resultingScene === linkData.target.data.id);

        setEventLinkEditInfo({
            source: linkData.source.data,
            target: linkData.target.data,
            connection:
                connectionIndex === -1
                    ? {
                          type: ConnectionType.NORMAL,
                      }
                    : linkData.source.data.sceneConnections[connectionIndex],
        });
    };

    const onCursorMoveInsideCanvas = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!tooltipOpen) {
            return;
        }

        const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
        const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top;
        updateTooltip({
            tooltipOpen: tooltipOpen,
            tooltipLeft: containerX,
            tooltipTop: containerY,
            tooltipData: tooltipData,
        });
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
            <Box component="main" className="new-event__content" onPointerMove={onCursorMoveInsideCanvas}>
                <Button color="primary">Add Visual Novel</Button>
                <ActorsCasting event={newEvent} onEventEdited={setNewEvent} pathOfTempImages={tempImagesPath} setPathOfTempImages={setTempImagesPaths} />
                {newVN && newVN.getVISXHierarchyOfVN() && (
                    <>
                        <svg className="new-event__flow" width={width} height={height} ref={containerRef}>
                            <rect width={width} height={height} rx={14} fill={background} />
                            <Tree<Scene> root={newVN.getVISXHierarchyOfVN()} size={[yMax, xMax]} className="event-tree">
                                {(tree) => (
                                    <Group top={margin.top} left={margin.left}>
                                        {tree.links().map((link, i) => (
                                            <LinkHorizontal
                                                className="event-tree__link"
                                                key={`link-${i}`}
                                                data={link}
                                                stroke={lightpurple}
                                                strokeWidth="5"
                                                onMouseLeave={onEventLinkMouseExit}
                                                onMouseOver={onEventLinkMouseOver}
                                                onMouseDown={() => onEventLinkClick(link)}
                                                fill="none"
                                            />
                                        ))}
                                        {tree.descendants().map((node, i) => (
                                            <EventNode key={`node-${i}`} node={node} onAddNode={onAddNode} onNodeSelected={onNodeSelected} onRemoveNode={onRemoveNode} />
                                        ))}
                                    </Group>
                                )}
                            </Tree>
                        </svg>
                        {tooltipOpen && (
                            <TooltipInPortal key={Math.random()} left={tooltipLeft} top={tooltipTop} style={defaultStyles}>
                                {tooltipData}
                            </TooltipInPortal>
                        )}
                    </>
                )}
            </Box>

            <Modal className="modal" open={editedNode !== null} onClose={() => setEditedNode(null)}>
                <Box className="modal__wrapper modal__wrapper-large">
                    <Box className="modal__header">Header</Box>
                    <Box className="modal__content utils__full-height">
                        <EditableScene
                            event={newEvent}
                            scene={editedNode}
                            onSceneEdited={onNodeEdited}
                            pathOfTempImages={tempImagesPath}
                            setPathOfTempImages={setTempImagesPaths}
                        />
                    </Box>
                </Box>
            </Modal>

            <EventLinkModal
                childScene={eventLinkEditInfo?.target}
                parentScene={eventLinkEditInfo?.source}
                sceneConnection={eventLinkEditInfo?.connection}
                onSceneConnectionChange={onConnectionEdited}
                open={!!eventLinkEditInfo}
                onClose={() => onConnectionEdited(null)}
            />
        </Box>
    );
}
