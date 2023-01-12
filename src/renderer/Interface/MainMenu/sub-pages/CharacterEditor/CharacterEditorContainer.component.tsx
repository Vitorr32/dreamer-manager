import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { EntityPicker } from 'renderer/shared/components/entity/EntityPicker.component';
import { Character, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { CharacterEditor } from './CharacterEditor.component';

export function CharacterEditorContainer() {
    const { t, i18n } = useTranslation();
    const [stateOfEntityPickerModal, setStateOfEntityPickerModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const onCharacterSelected = (character: Character) => {
        navigate(`edit/${character.id}`);
        setStateOfEntityPickerModal(false);
    };

    return (
        <Routes>
            <Route path="new" element={<CharacterEditor />} />
            <Route path="edit/:id" element={<CharacterEditor />} />
            <Route
                path="/"
                element={
                    <Box>
                        <div className="menu-wrapper">
                            <Link to="/menu/edit">
                                <button>Return Menu</button>
                            </Link>
                            <Link to="new">
                                <button>New Character</button>
                            </Link>
                            <Button onClick={() => setStateOfEntityPickerModal(true)}>Edit Character</Button>
                        </div>

                        <EntityPicker
                            open={stateOfEntityPickerModal}
                            entity={EntityType.CHARACTERS}
                            getDisplayName={(character: Character) => `${character.name} ${character.nickname ? `"${character.nickname}" ` : ''}${character.surname}`}
                            pickerTitle={t('interface.editor.character.character_picker_title')}
                            pickerLabel={t('interface.editor.character.character_picker_label')}
                            onClose={() => setStateOfEntityPickerModal(false)}
                            onSelected={onCharacterSelected}
                        />
                    </Box>
                }
            />
        </Routes>
    );
}
