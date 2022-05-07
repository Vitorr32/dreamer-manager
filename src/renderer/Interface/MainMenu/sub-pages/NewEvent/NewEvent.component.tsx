import { Box, Button, MenuItem, Modal, TextField, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LANGUAGE_CODES } from 'renderer/shared/Constants';
import { getLocaleLabel } from 'renderer/shared/utils/Localization';
import { useEffect, useState } from 'react';
import { Event, Flag } from 'renderer/shared/models/base/Event.model';
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
import { NewEventFlag } from './NewEventFlag.component';
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event';

interface IProps {
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

const whitesmoke = '#f5f5f5';
const lightpurple = '#CBC3E3';
const lightorange = '#FFD580';
export const background = '#272b4d';

const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };
const initialTransform = {
    scaleX: 1.27,
    scaleY: 1.27,
    translateX: -211.62,
    translateY: 162.59,
    skewX: 0,
    skewY: 0,
};

export function NewEvent({ width = window.innerWidth - 100, height = 500, margin = defaultMargin }: IProps) {
    const { t, i18n } = useTranslation();
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal({ scroll: true, detectBounds: false });
    const { showTooltip, updateTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft = 0, tooltipTop = 0 } = useTooltip();

    const [editedNode, setEditedNode] = useState<Scene | null>(null);
    const [newEvent, setNewEvent] = useState(new Event(undefined, '', { condition: new ConditionTree(), queryActorsConditions: [] }));
    const [newVN, setVN] = useState<VisualNovel>(null);
    const [tempImagesPath, setTempImagesPaths] = useState<{ [key: string]: string }>({});
    const [sceneLinkEditInfo, setSceneLinkEditInfo] = useState<{ source: Scene; target: Scene; connection: SceneConnection }>();
    const [editingFlagModalOpen, setFlagModalState] = useState<boolean>(false);

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

    const onAddNodeFromParent = (parent: Scene) => {
        const visualNovel = CopyClassInstance(newVN);

        const newScene = CopyClassInstance(parent);
        const newSceneID = new Scene().id;

        newScene.id = newSceneID;

        visualNovel.addScene(parent, newScene);

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

    const onFlagModified = (flag: Flag) => {
        const updatedEvent = CopyClassInstance(newEvent);
        const flagIndex = newEvent.flags.findIndex((toCompareFlag) => toCompareFlag.id === flag.id);

        if (flagIndex === -1) {
            updatedEvent.flags.push(flag);
        } else {
            updatedEvent.flags[flagIndex] = flag;
        }

        setNewEvent(updatedEvent);
    };

    const onConnectionEdited = (sceneConnection: SceneConnection, closeModal: boolean = false) => {
        if (!sceneConnection) {
            setSceneLinkEditInfo(null);
            return;
        }

        const visualNovel = CopyClassInstance(newVN);

        const parentScene = sceneLinkEditInfo.source;
        const childScene = sceneLinkEditInfo.target;
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
            setSceneLinkEditInfo(null);
        } else {
            setSceneLinkEditInfo({ source: newScene, connection: sceneConnection, target: sceneLinkEditInfo.target });
        }
    };

    const getConnectionInformation = (source: Scene, target: Scene) => {
        return source.sceneConnections.find((connection) => connection.resultingScene === target.id);
    };

    const onSceneLinkMouseOver = (sceneConnection: SceneConnection) => {
        showTooltip({ tooltipData: 'Link Horizontal' });
    };

    const onSceneLinkMouseExit = () => {
        hideTooltip();
    };

    const onSceneLinkClick = (linkData: HierarchyPointLink<Scene>) => {
        const connectionIndex = linkData.source.data.sceneConnections.findIndex((connection) => connection.resultingScene === linkData.target.data.id);

        setSceneLinkEditInfo({
            source: linkData.source.data,
            target: linkData.target.data,
            connection:
                connectionIndex === -1
                    ? {
                          type: ConnectionType.NORMAL,
                          resultingScene: linkData.target.data.id,
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
                <Button onClick={() => setFlagModalState(true)}>Modify Event Flags</Button>
                {newVN && newVN.getVISXHierarchyOfVN() && (
                    <>
                        <Zoom<SVGSVGElement>
                            width={width}
                            height={height}
                            scaleXMin={1 / 2}
                            scaleXMax={4}
                            scaleYMin={1 / 2}
                            scaleYMax={4}
                            initialTransformMatrix={initialTransform}
                        >
                            {(zoom) => (
                                <Box style={{ position: 'relative' }}>
                                    {console.log(zoom)}
                                    <svg
                                        className="new-event__flow"
                                        width={width}
                                        height={height}
                                        ref={zoom.containerRef}
                                        style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                                    >
                                        <rect
                                            width={width}
                                            height={height}
                                            rx={14}
                                            fill={background}
                                            onTouchStart={zoom.dragStart}
                                            onTouchMove={zoom.dragMove}
                                            onTouchEnd={zoom.dragEnd}
                                            onMouseDown={zoom.dragStart}
                                            onMouseMove={zoom.dragMove}
                                            onMouseUp={zoom.dragEnd}
                                            onMouseLeave={() => {
                                                if (zoom.isDragging) zoom.dragEnd();
                                            }}
                                            onDoubleClick={(event) => {
                                                const point = localPoint(event) || { x: 0, y: 0 };
                                                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                                            }}
                                        />
                                        <Tree<Scene> root={newVN.getVISXHierarchyOfVN()} size={[yMax, xMax]} className="event-tree">
                                            {(tree) => (
                                                <Group top={margin.top} left={margin.left} transform={zoom.toString()}>
                                                    {tree.links().map((link, i) => {
                                                        const linkInfo = getConnectionInformation(link.source.data, link.target.data);

                                                        return (
                                                            <LinkHorizontal
                                                                className="event-tree__link"
                                                                key={`link-${i}`}
                                                                data={link}
                                                                stroke={
                                                                    linkInfo?.type === ConnectionType.NORMAL || !linkInfo?.type
                                                                        ? whitesmoke
                                                                        : linkInfo?.type === ConnectionType.HIDDEN_CHECK
                                                                        ? lightpurple
                                                                        : lightorange
                                                                }
                                                                strokeWidth="5"
                                                                onMouseLeave={onSceneLinkMouseExit}
                                                                onMouseOver={() => onSceneLinkMouseOver(linkInfo)}
                                                                onMouseDown={() => onSceneLinkClick(link)}
                                                                fill="none"
                                                            />
                                                        );
                                                    })}
                                                    {tree.descendants().map((node, i) => (
                                                        <EventNode
                                                            key={`node-${i}`}
                                                            node={node}
                                                            onAddNode={onAddNode}
                                                            onAddNodeAutoCompleted={onAddNodeFromParent}
                                                            onNodeSelected={onNodeSelected}
                                                            onRemoveNode={onRemoveNode}
                                                        />
                                                    ))}
                                                </Group>
                                            )}
                                        </Tree>
                                    </svg>

                                    <div className="controls">
                                        <button type="button" className="btn btn-zoom" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
                                            +
                                        </button>
                                        <button type="button" className="btn btn-zoom btn-bottom" onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>
                                            -
                                        </button>
                                        <button type="button" className="btn btn-lg" onClick={zoom.center}>
                                            Center
                                        </button>
                                        <button type="button" className="btn btn-lg" onClick={zoom.reset}>
                                            Reset
                                        </button>
                                        <button type="button" className="btn btn-lg" onClick={zoom.clear}>
                                            Clear
                                        </button>
                                    </div>
                                </Box>
                            )}
                        </Zoom>
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
                childScene={sceneLinkEditInfo?.target}
                parentScene={sceneLinkEditInfo?.source}
                sceneConnection={sceneLinkEditInfo?.connection}
                onSceneConnectionChange={onConnectionEdited}
                open={!!sceneLinkEditInfo}
                onClose={() => onConnectionEdited(null)}
            />

            <NewEventFlag isOpen={editingFlagModalOpen} onClose={() => setFlagModalState(false)} event={newEvent} onFlagModified={onFlagModified} />
        </Box>
    );
}
