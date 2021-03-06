import { Group } from '@visx/group';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { Scene } from 'renderer/shared/models/base/Scene.model';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const blue = '#03c0dc';
const green = '#26deb0';
const plum = '#71248e';
const white = '#ffffff';
export const background = '#272b4d';

type HierarchyNode = HierarchyPointNode<Scene>;

/** Handles rendering Root, Parent, and other Nodes. */
export function EventNode({
    node,
    onAddNode,
    onAddNodeAutoCompleted,
    onNodeSelected,
    onRemoveNode,
}: {
    node: HierarchyNode;
    onAddNode: (scene: Scene) => void;
    onAddNodeAutoCompleted: (scene: Scene) => void;
    onNodeSelected: (scene: Scene) => void;
    onRemoveNode: (scene: Scene, parent: Scene) => void;
}) {
    const { t, i18n } = useTranslation();
    const width = 40;
    const height = 20;
    const centerX = -width / 2;
    const centerY = -height / 2;
    const isRoot = node.depth === 0;
    const [focusedNode, setFocusedNode] = useState('');
    const theme = useTheme();

    if (isRoot) {
        return (
            <RootNode
                node={node}
                focusedNode={focusedNode}
                onAddNodeAutoCompleted={onAddNodeAutoCompleted}
                setFocusedNode={setFocusedNode}
                onAddNode={onAddNode}
                onNodeSelected={onNodeSelected}
            />
        );
    }

    return (
        <Group
            top={node.x}
            left={node.y}
            className={`eventNode ${focusedNode === node.data.id ? 'focused' : ''}`}
            onClick={() => setFocusedNode(focusedNode === node.data.id ? '' : node.data.id)}
        >
            <rect height={height} width={width} y={centerY} x={centerX} fill={background} stroke={green} strokeWidth={1} strokeDasharray="2,2" strokeOpacity={0.6} rx={10} />
            <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" fill={green} style={{ pointerEvents: 'none' }}>
                {node.data.id}
            </text>

            <text
                className="eventNode__addChild"
                y={-theme.typography.fontSize * 2}
                dy=".33em"
                fontSize={theme.typography.fontSize}
                fontFamily={theme.typography.fontFamily}
                fill={theme.palette.common.white}
                textAnchor="middle"
                onClick={() => onAddNode(node.data)}
            >
                {t('interface.editor.event.scene_node_add')}
            </text>
            <text
                className="eventNode__addParentCopy"
                y={-theme.typography.fontSize * 4}
                dy=".33em"
                fontSize={theme.typography.fontSize}
                fontFamily={theme.typography.fontFamily}
                fill={theme.palette.common.white}
                textAnchor="middle"
                onClick={() => onAddNodeAutoCompleted(node.data)}
            >
                {t('interface.editor.event.scene_node_copy')}
            </text>
            <text
                className="eventNode__editNode"
                y={-theme.typography.fontSize * 6}
                dy=".33em"
                fontSize={theme.typography.fontSize}
                fontFamily={theme.typography.fontFamily}
                fill={theme.palette.common.white}
                textAnchor="middle"
                onClick={() => onNodeSelected(node.data)}
            >
                {t('interface.editor.event.scene_node_edit')}
            </text>
            <text
                className="eventNode__removeNode"
                y={-theme.typography.fontSize * 8}
                dy=".33em"
                fontSize={theme.typography.fontSize}
                fontFamily={theme.typography.fontFamily}
                fill={theme.palette.common.white}
                textAnchor="middle"
                onClick={() => onRemoveNode(node.data, node.parent.data)}
            >
                {t('interface.editor.event.scene_node_remove')}
            </text>
        </Group>
    );
}

function RootNode({
    node,
    focusedNode,
    setFocusedNode,
    onAddNode,
    onAddNodeAutoCompleted,
    onNodeSelected,
}: {
    node: HierarchyNode;
    focusedNode: string;
    setFocusedNode: React.Dispatch<React.SetStateAction<string>>;
    onAddNode: (scene: Scene) => void;
    onAddNodeAutoCompleted: (scene: Scene) => void;
    onNodeSelected: (scene: Scene) => void;
}) {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const thisKey = 'root';

    return (
        <Group
            top={node.x}
            left={node.y}
            className={`eventNode ${focusedNode === thisKey ? 'focused' : ''}`}
            onClick={() => setFocusedNode(focusedNode === thisKey ? '' : thisKey)}
        >
            <circle r={theme.typography.fontSize} fill="crimson" />
            <text dy=".33em" fontSize={theme.typography.fontSize} fontFamily={theme.typography.fontFamily} textAnchor="middle" fill={plum}>
                {t('interface.editor.event.scene_root')}
            </text>

            <text
                className="eventNode__addChild"
                y={node.y - theme.typography.fontSize * 2}
                dy=".33em"
                fontSize={theme.typography.fontSize}
                fontFamily={theme.typography.fontFamily}
                fill={theme.palette.common.white}
                textAnchor="middle"
                onClick={() => onAddNode(node.data)}
            >
                Add Child
            </text>
            <text
                className="eventNode__addParentCopy"
                y={-theme.typography.fontSize * 4}
                dy=".33em"
                fontSize={theme.typography.fontSize}
                fontFamily={theme.typography.fontFamily}
                fill={theme.palette.common.white}
                textAnchor="middle"
                onClick={() => onAddNodeAutoCompleted(node.data)}
            >
                Add Copy of Parent
            </text>
            <text
                className="eventNode__editNode"
                y={node.y - theme.typography.fontSize * 6}
                dy=".33em"
                fontSize={theme.typography.fontSize}
                fontFamily={theme.typography.fontFamily}
                fill={theme.palette.common.white}
                textAnchor="middle"
                onClick={() => onNodeSelected(node.data)}
            >
                Edit Node
            </text>
        </Group>
    );
}

function ParentNode({ node }: { node: HierarchyNode }) {
    const width = 40;
    const height = 20;
    const centerX = -width / 2;
    const centerY = -height / 2;

    return (
        <Group top={node.x} left={node.y}>
            <rect
                height={height}
                width={width}
                y={centerY}
                x={centerX}
                fill={background}
                stroke={blue}
                strokeWidth={1}
                onClick={() => {
                    alert(`clicked: ${JSON.stringify(node.data.id)}`);
                }}
            />
            <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" style={{ pointerEvents: 'none' }} fill={white}>
                {node.data.id}
            </text>
        </Group>
    );
}
