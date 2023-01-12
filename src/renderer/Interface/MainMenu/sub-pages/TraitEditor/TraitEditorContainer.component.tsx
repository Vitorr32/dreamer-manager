import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { EntityPicker } from 'renderer/shared/components/entity/EntityPicker.component';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { TraitEditor } from './TraitEditor.component';

export function TraitEditorContainer() {
    const { t, i18n } = useTranslation();
    const [stateOfEntityPickerModal, setStateOfEntityPickerModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const onEntitySelected = (entity: Trait) => {
        navigate(`edit/${entity.id}`);
        setStateOfEntityPickerModal(false);
    };

    return (
        <Routes>
            <Route path="new" element={<TraitEditor />} />
            <Route path="edit/:id" element={<TraitEditor />} />
            <Route
                path="/"
                element={
                    <Box>
                        <div className="menu-wrapper">
                            <Link to="/menu/edit">
                                <button>Return Menu</button>
                            </Link>
                            <Link to="new">
                                <button>New Trait</button>
                            </Link>
                            <Button onClick={() => setStateOfEntityPickerModal(true)}>Edit Trait</Button>
                        </div>

                        <EntityPicker
                            open={stateOfEntityPickerModal}
                            entity={EntityType.TRAITS}
                            getDisplayName={(entity: Trait) => `${entity.getName(i18n.language)} - ${entity.id}`}
                            pickerTitle={t('interface.editor.trait.trait_picker_title')}
                            pickerLabel={t('interface.editor.trait.trait_picker_label')}
                            onClose={() => setStateOfEntityPickerModal(false)}
                            onSelected={onEntitySelected}
                        />
                    </Box>
                }
            />
        </Routes>
    );
}
