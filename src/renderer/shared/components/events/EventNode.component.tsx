import { Group } from '@visx/group';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { Scene } from 'renderer/shared/models/base/Scene.model';

const peach = '#fd9b93';
const pink = '#fe6e9e';
const blue = '#03c0dc';
const green = '#26deb0';
const plum = '#71248e';
const lightpurple = '#374469';
const white = '#ffffff';
export const background = '#272b4d';

type HierarchyNode = HierarchyPointNode<Scene>;

function EventNode({ node }: { node: HierarchyNode }) {
    const width = 40;
    const height = 20;
    const centerX = -width / 2;
    const centerY = -height / 2;
    const isRoot = node.depth === 0;
    const isParent = !!node.children;

    if (isRoot) return <RootNode node={node} />;
    if (isParent) return <ParentNode node={node} />;

    return (
        <Group top={node.x} left={node.y}>
            <rect
                height={height}
                width={width}
                y={centerY}
                x={centerX}
                fill={background}
                stroke={green}
                strokeWidth={1}
                strokeDasharray="2,2"
                strokeOpacity={0.6}
                rx={10}
                onClick={() => {
                    alert(`clicked: ${JSON.stringify(node.data.id)}`);
                }}
            />
            <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" fill={green} style={{ pointerEvents: 'none' }}>
                {node.data.id}
            </text>
        </Group>
    );
}

function RootNode({ node }: { node: HierarchyNode }) {
    return (
        <Group top={node.x} left={node.y}>
            <circle r={12} fill="url('#lg')" />
            <text dy=".33em" fontSize={9} fontFamily="Arial" textAnchor="middle" style={{ pointerEvents: 'none' }} fill={plum}>
                {node.data.id}
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
