import { Box, Button, MenuItem, Modal, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    BASE_EVENT_FILE,
    DATABASE_FOLDER,
    EVENT_BACKGROUND_IMAGES_FOLDER,
    EVENT_DATABASE_FOLDER,
    GENERIC_SPRITES_FOLDER,
    IMAGES_FOLDER,
    LANGUAGE_CODES,
    SPRITES_FOLDER,
} from 'renderer/shared/Constants';
import { getLocaleLabel } from 'renderer/shared/utils/Localization';
import React, { useEffect, useState } from 'react';
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
import { ApplyFileProtocol, GetFileInfoFromPath, RemoveFileProtocol } from 'renderer/shared/utils/StringOperations';
import { InsertIconInAssets, InsertJSONFileAsDatabase } from 'renderer/shared/scripts/DatabaseCreate.script';
import { EffectList } from 'renderer/shared/components/effects/EffectList.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { EffectEditor } from 'renderer/shared/components/effects/EffectEditor.component';

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
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
};

export function NewEvent({ width = window.innerWidth - 100, height = 500, margin = defaultMargin }: IProps) {
    const { t, i18n } = useTranslation();
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    const { containerBounds, TooltipInPortal } = useTooltipInPortal({ scroll: true, detectBounds: false });
    const { showTooltip, updateTooltip, hideTooltip, tooltipOpen, tooltipData, tooltipLeft = 0, tooltipTop = 0 } = useTooltip();

    const [isLoading, setLoadingState] = useState<boolean>(false);
    const [editEffectIndex, setEditEffectIndex] = useState<number>();
    const [editedNode, setEditedNode] = useState<Scene | null>(null);
    const [newEvent, setNewEvent] = useState(new Event(undefined, '', { condition: new ConditionTree(), queryActorsConditions: [] }));
    const [newVN, setVN] = useState<VisualNovel>(null);
    const [tempImagesPath, setTempImagesPaths] = useState<{ [key: string]: string }>({});
    const [sceneLinkEditInfo, setSceneLinkEditInfo] = useState<{ source: Scene; target: Scene; connection: SceneConnection }>();
    const [editingFlagModalOpen, setFlagModalState] = useState<boolean>(false);

    const onAddVisualNovelToEvent = (): void => {
        const visualNovel = Object.assign(new VisualNovel(), newVN);

        const rootScene = new Scene();
        const childScene = new Scene();

        visualNovel.addScene(null, rootScene);
        visualNovel.addScene(rootScene, childScene);

        setVN(visualNovel);
    };

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
        newScene.sceneResults = null;
        newScene.sceneConnections = null;

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

    const onAddEffectsToEvent = () : void => {
        const modifiedEvent = Object.assign({}, newEvent);
        modifiedEvent.effects = [];

        setNewEvent(modifiedEvent);
    }

    const onNewEffectAddedToList = (): void => {
        const modifiedEvent = Object.assign({}, newEvent);
        modifiedEvent.effects.push(new Effect());

        setNewEvent(modifiedEvent);
    };

    const onEditEffect = (index: number, effect: Effect): void => {
        const modifiedEvent = Object.assign({}, newEvent);
        modifiedEvent.effects[index] = effect;

        setEditEffectIndex(null);
        setNewEvent(modifiedEvent);
    };

    const onDeleteEffectFromList = (index: number): void => {
        const modifiedEvent = Object.assign({}, newEvent);
        modifiedEvent.effects.splice(index, 1);

        setNewEvent(modifiedEvent);
    };

    const onEventSubmitted = async () => {
        setLoadingState(true);
        //TODO: Make the checks to see if all the event content is correct.
        if (false) {
            console.log('Invalid');
            return;
        }
        console.log('Valid');

        //Copy temporary files into the game static files.
        Object.keys(tempImagesPath).forEach(async (key) => {
            const tempImagePath = tempImagesPath[key];
            const fileInfo = await GetFileInfoFromPath(tempImagePath);

            if (key.startsWith('scene')) {
                InsertIconInAssets(RemoveFileProtocol(tempImagePath), [IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER], fileInfo.fileName);
            } else if (key.startsWith('actor')) {
                InsertIconInAssets(RemoveFileProtocol(tempImagePath), [SPRITES_FOLDER, GENERIC_SPRITES_FOLDER], fileInfo.fileName);
            }
        });

        if (newVN) {
            newEvent.visualNovel = newVN;
        }

        InsertJSONFileAsDatabase([DATABASE_FOLDER, EVENT_DATABASE_FOLDER], BASE_EVENT_FILE, newEvent, true);
        setLoadingState(false);
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
                <Box>
                    <Button onClick={onAddVisualNovelToEvent} color="primary">
                        {t('interface.editor.event.event_add_visual_novel')}
                    </Button>
                    <Button onClick={onAddEffectsToEvent} color="primary">
                        {t('interface.editor.event.event_add_event_effect')}
                    </Button>
                    <Button onClick={() => setFlagModalState(true)}>Modify Event Flags</Button>
                    <Typography variant="subtitle2">{t('interface.editor.event.event_options_helper')}</Typography>
                </Box>
                {newVN && newVN.getVISXHierarchyOfVN() && (
                    <>
                        <ActorsCasting event={newEvent} onEventEdited={setNewEvent} pathOfTempImages={tempImagesPath} setPathOfTempImages={setTempImagesPaths} />
                        <Zoom<SVGSVGElement>
                            width={width}
                            height={height}
                            scaleXMin={1 / 32}
                            scaleXMax={4}
                            scaleYMin={1 / 32}
                            scaleYMax={4}
                            initialTransformMatrix={initialTransform}
                        >
                            {(zoom) => (
                                <Box style={{ position: 'relative' }}>
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

                                    <Box className="controls">
                                        <Button type="button" className="btn btn-zoom" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
                                            +
                                        </Button>
                                        <Button type="button" className="btn btn-zoom btn-bottom" onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>
                                            -
                                        </Button>
                                        <Button type="button" className="btn btn-lg" onClick={zoom.center}>
                                            Center
                                        </Button>
                                        <Button type="button" className="btn btn-lg" onClick={zoom.reset}>
                                            Reset
                                        </Button>
                                        <Button type="button" className="btn btn-lg" onClick={zoom.clear}>
                                            Clear
                                        </Button>
                                    </Box>
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
            {newEvent.effects && (
                <>
                    <Box className="new-event__list-wrapper">
                        <EffectList
                            effects={newEvent.effects || []}
                            onEffectSelected={(index) => setEditEffectIndex(index)}
                            onEffectDeleted={(index) => onDeleteEffectFromList(index)}
                        />

                        <Button variant="outlined" startIcon={<AddIcon />} onClick={onNewEffectAddedToList}>
                            {t('interface.editor.effect.add_effect')}
                        </Button>

                        {editEffectIndex !== null && <EffectEditor onChange={onEditEffect} index={editEffectIndex} effect={newEvent.effects[editEffectIndex]} />}
                    </Box>
                </>
            )}

            <Box className="new-event__submit-wrapper">
                <Button onClick={onEventSubmitted}>{t('interface.editor.event.submit_event_button_label')}</Button>
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
