import { Box, Button, Modal, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import {
    BASE_EVENT_FILE,
    DATABASE_FOLDER,
    EVENT_BACKGROUND_IMAGES_FOLDER,
    EVENT_DATABASE_FOLDER,
    GENERIC_SPRITES_FOLDER,
    IMAGES_FOLDER,
    SPRITES_FOLDER,
} from 'renderer/shared/Constants';
import { useEffect, useState } from 'react';
import { Event } from 'renderer/shared/models/base/Event.model';
import { Flag } from 'renderer/shared/models/interfaces/Flag.interface';
import { Scene, SceneConnection } from 'renderer/shared/models/base/Scene.model';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';
import { EditableScene } from 'renderer/shared/components/scene/EditableScene';
import { ActorsCasting } from 'renderer/shared/components/scene/ActorsCasting';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { GetFileInfoFromPath, RemoveFileProtocol } from 'renderer/shared/utils/StringOperations';
import { InsertIconInAssets, UpdateDatabaseJSONFile } from 'renderer/shared/scripts/DatabaseCreate.script';
import { EffectList } from 'renderer/shared/components/effects/EffectList.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { EffectEditor } from 'renderer/shared/components/effects/EffectEditor.component';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { LanguageToggle } from 'renderer/shared/components/util/LanguageToggle.component';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { EventTreeRender } from './EventTreeRender.component';
import { EventInfoModal } from './EventInfoModal.component';
import { NewEventFlag } from './NewEventFlag.component';
import { EventLinkModal } from './EventLinkModal.component';

interface IProps {}

export function NewEvent({}: IProps) {
    const params = useParams();
    const { t, i18n } = useTranslation();
    const mappedEvents = useSelector((state: RootState) => state.database.mappedDatabase.events);

    const [isLoading, setLoadingState] = useState<boolean>(false);
    const [editEffectIndex, setEditEffectIndex] = useState<number>(-1);
    const [editedNode, setEditedNode] = useState<Scene | null>(null);
    const [currentEvent, setCurrentEvent] = useState(new Event(undefined, '', { condition: new EntityFilterTree(), queryActorsConditions: [] }));
    const [currentVN, setCurrentVN] = useState<VisualNovel>(null);
    const [tempImagesPath, setTempImagesPaths] = useState<{ [key: string]: string }>({});
    const [sceneLinkEditInfo, setSceneLinkEditInfo] = useState<{ source: Scene; target: Scene; connection: SceneConnection }>();
    const [editingFlagModalOpen, setFlagModalState] = useState<boolean>(false);
    const [editingEventInfoModalOpen, setEventInfoState] = useState<boolean>(false);

    useEffect(() => {
        const eventIDParameter = params?.id;

        if (eventIDParameter) {
            const toEditEvent = mappedEvents[eventIDParameter];

            setCurrentEvent(toEditEvent);
            setCurrentVN(toEditEvent.visualNovel);
        }
    }, []);

    const onAddVisualNovelToEvent = (): void => {
        const visualNovel = Object.assign(new VisualNovel(), currentVN);

        const rootScene = new Scene();
        const childScene = new Scene();

        visualNovel.addScene(null, rootScene);
        visualNovel.addScene(rootScene, childScene);

        setCurrentVN(visualNovel);
    };

    const onAddNode = (parent: Scene) => {
        const visualNovel = CopyClassInstance(currentVN);

        visualNovel.addScene(parent, new Scene());

        setCurrentVN(visualNovel);
    };

    const onAddNodeFromParent = (parent: Scene) => {
        const visualNovel = CopyClassInstance(currentVN);

        const newScene = CopyClassInstance(parent);
        const newSceneID = new Scene().id;

        newScene.id = newSceneID;
        newScene.sceneResults = null;
        newScene.sceneConnections = null;

        visualNovel.addScene(parent, newScene);
        setCurrentVN(visualNovel);
    };

    const onRemoveNode = (scene: Scene, parent: Scene) => {
        const visualNovel = CopyClassInstance(currentVN);

        visualNovel.removeScene(parent, scene);

        setCurrentVN(visualNovel);
    };

    const onNodeSelected = (scene: Scene) => {
        setEditedNode(scene);
    };

    const onNodeEdited = (scene: Scene, closeModal = false) => {
        const modifiedVisualNovel = CopyClassInstance(currentVN);
        modifiedVisualNovel.updateScene(scene);

        setCurrentVN(modifiedVisualNovel);

        if (closeModal) {
            setEditedNode(null);
        } else {
            setEditedNode(scene);
        }
    };

    const onFlagModified = (flag: Flag) => {
        const updatedEvent = CopyClassInstance(currentEvent);
        const flagIndex = currentEvent.flags.findIndex((toCompareFlag) => toCompareFlag.id === flag.id);

        if (flagIndex === -1) {
            updatedEvent.flags.push(flag);
        } else {
            updatedEvent.flags[flagIndex] = flag;
        }

        setCurrentEvent(updatedEvent);
    };

    const onConnectionEdited = (sceneConnection: SceneConnection, closeModal = false) => {
        if (!sceneConnection) {
            setSceneLinkEditInfo(null);
            return;
        }

        const visualNovel = CopyClassInstance(currentVN);

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
        setCurrentVN(visualNovel);

        if (closeModal) {
            setSceneLinkEditInfo(null);
        } else {
            setSceneLinkEditInfo({ source: newScene, connection: sceneConnection, target: sceneLinkEditInfo.target });
        }
    };

    const onChangeInEventAttributes = (keyName: 'id' | 'displayName', value: any) => {
        const modifiedEvent = CopyClassInstance(currentEvent);

        modifiedEvent[keyName] = value;

        setCurrentEvent(modifiedEvent);
    };

    const onAddEffectsToEvent = (): void => {
        const modifiedEvent = { ...currentEvent };
        modifiedEvent.effects = [];

        setCurrentEvent(modifiedEvent);
        setEditEffectIndex(-1);
    };

    const onNewEffectAddedToList = (): void => {
        const modifiedEvent = { ...currentEvent };
        modifiedEvent.effects.push(new Effect());

        setCurrentEvent(modifiedEvent);
    };

    const onEditEffect = (index: number, effect: Effect): void => {
        const modifiedEvent = { ...currentEvent };
        modifiedEvent.effects[index] = effect;

        setCurrentEvent(modifiedEvent);
    };

    const onDeleteEffectFromList = (index: number): void => {
        const modifiedEvent = { ...currentEvent };
        modifiedEvent.effects.splice(index, 1);

        setCurrentEvent(modifiedEvent);
    };

    const onEventSubmitted = async () => {
        setLoadingState(true);
        const toSubmitEvent = CopyClassInstance(currentEvent);
        const toSubmitVN = currentVN ? CopyClassInstance(currentVN) : null;

        // TODO: Make the checks to see if all the event content is correct.
        if (false) {
            return;
        }

        if (toSubmitVN) {
            // Copy temporary files into the game static files, then update the references on the objects to internal paths.
            Object.keys(tempImagesPath).forEach(async (key) => {
                const tempImagePath = tempImagesPath[key];
                const fileInfo = await GetFileInfoFromPath(tempImagePath);

                if (key.startsWith('scene')) {
                    InsertIconInAssets(RemoveFileProtocol(tempImagePath), [IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER], fileInfo.fileName);

                    const toUpdateScene = toSubmitVN.getScene(key);
                    toUpdateScene.backgroundImagePath = [IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, fileInfo.fileName];

                    toSubmitVN.updateScene(toUpdateScene);
                } else if (key.startsWith('actor')) {
                    InsertIconInAssets(RemoveFileProtocol(tempImagePath), [SPRITES_FOLDER, GENERIC_SPRITES_FOLDER], fileInfo.fileName);

                    const toUpdateActor = toSubmitEvent.getActor(key);
                    toUpdateActor.spriteFilePath = [SPRITES_FOLDER, GENERIC_SPRITES_FOLDER, fileInfo.fileName];

                    toSubmitEvent.modifyActor(toUpdateActor);
                }
            });

            toSubmitEvent.visualNovel = toSubmitVN;
        }

        UpdateDatabaseJSONFile([DATABASE_FOLDER, EVENT_DATABASE_FOLDER], BASE_EVENT_FILE, toSubmitEvent, true);
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

                <LanguageToggle />
            </Box>
            <Box component="main" className="new-event__content">
                <Box>
                    <Button onClick={onAddVisualNovelToEvent} color="primary">
                        {t('interface.editor.event.event_add_visual_novel')}
                    </Button>
                    <Button onClick={onAddEffectsToEvent} color="primary">
                        {t('interface.editor.event.event_add_event_effect')}
                    </Button>
                    <Button onClick={() => setFlagModalState(true)}>{t('interface.editor.event.event_open_flags_modal')}</Button>
                    <Button onClick={() => setEventInfoState(true)}>{t('interface.editor.event.event_open_info_modal')}</Button>
                    <Typography variant="subtitle2">{t('interface.editor.event.event_options_helper')}</Typography>
                </Box>

                <ActorsCasting event={currentEvent} onEventEdited={setCurrentEvent} pathOfTempImages={tempImagesPath} setPathOfTempImages={setTempImagesPaths} />
                <EventTreeRender
                    visualNovel={currentVN}
                    parentNodeCopied={onAddNodeFromParent}
                    nodeAdded={onAddNode}
                    nodeRemoved={onRemoveNode}
                    nodeSelected={onNodeSelected}
                    onLinkClicked={(linkData) => setSceneLinkEditInfo(linkData)}
                />
            </Box>
            {currentEvent.effects && (
                <>
                    <Box className="new-event__list-wrapper">
                        <EffectList
                            effects={currentEvent.effects || []}
                            onEffectSelected={(index) => setEditEffectIndex(index)}
                            onEffectDeleted={(index) => onDeleteEffectFromList(index)}
                        />

                        <Button variant="outlined" startIcon={<AddIcon />} onClick={onNewEffectAddedToList}>
                            {t('interface.editor.effect.add_effect')}
                        </Button>

                        {editEffectIndex !== -1 && (
                            <EffectEditor
                                onChange={onEditEffect}
                                index={editEffectIndex}
                                effect={currentEvent.effects[editEffectIndex]}
                                options={{
                                    specifiedEntities: {
                                        [EntityType.ACTORS]: currentEvent.actors.map((actor) => ({ label: actor.alias, data: actor })),
                                        [EntityType.FLAGS]: currentEvent.flags.map((flag) => ({ label: flag.displayName, data: flag })),
                                    },
                                }}
                            />
                        )}
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
                            event={currentEvent}
                            scene={editedNode}
                            onSceneEdited={onNodeEdited}
                            pathOfTempImages={tempImagesPath}
                            setPathOfTempImages={setTempImagesPaths}
                        />
                    </Box>
                </Box>
            </Modal>

            <EventInfoModal open={editingEventInfoModalOpen} event={currentEvent} onEventChange={onChangeInEventAttributes} onClose={() => setEventInfoState(false)} />

            <EventLinkModal
                childScene={sceneLinkEditInfo?.target}
                parentScene={sceneLinkEditInfo?.source}
                sceneConnection={sceneLinkEditInfo?.connection}
                onSceneConnectionChange={onConnectionEdited}
                open={!!sceneLinkEditInfo}
                onClose={() => onConnectionEdited(null)}
            />

            <NewEventFlag isOpen={editingFlagModalOpen} onClose={() => setFlagModalState(false)} event={currentEvent} onFlagModified={onFlagModified} />
        </Box>
    );
}
