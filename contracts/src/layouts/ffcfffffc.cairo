// Core imports

use debug::PrintTrait;

// Internal imports

use stolsli::layouts::interface::LayoutTrait;
use stolsli::types::direction::Direction;
use stolsli::types::spot::{Spot, SpotImpl};
use stolsli::types::move::{Move, MoveImpl};
use stolsli::types::area::Area;

impl LayoutImpl of LayoutTrait {
    #[inline(always)]
    fn moves(from: Spot) -> Array<Move> {
        let mut moves: Array<Move> = ArrayTrait::new();
        match from {
            Spot::None => {},
            Spot::Center => {
                moves.append(Move { direction: Direction::East, spot: Spot::West });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
            },
            Spot::NorthWest => {
                moves.append(Move { direction: Direction::East, spot: Spot::West });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
            },
            Spot::North => {
                moves.append(Move { direction: Direction::North, spot: Spot::South });
            },
            Spot::NorthEast => {
                moves.append(Move { direction: Direction::East, spot: Spot::West });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
            },
            Spot::East => {
                moves.append(Move { direction: Direction::East, spot: Spot::West });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
            },
            Spot::SouthEast => {
                moves.append(Move { direction: Direction::East, spot: Spot::West });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
            },
            Spot::South => {
                moves.append(Move { direction: Direction::East, spot: Spot::West });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
            },
            Spot::SouthWest => {
                moves.append(Move { direction: Direction::East, spot: Spot::West });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
            },
            Spot::West => { moves.append(Move { direction: Direction::West, spot: Spot::East }); },
        };
        moves
    }

    #[inline(always)]
    fn area(from: Spot) -> Area {
        match from {
            Spot::None => Area::None,
            Spot::Center => Area::Center,
            Spot::NorthWest => Area::Center,
            Spot::North => Area::North,
            Spot::NorthEast => Area::Center,
            Spot::East => Area::Center,
            Spot::SouthEast => Area::Center,
            Spot::South => Area::Center,
            Spot::SouthWest => Area::Center,
            Spot::West => Area::West,
        }
    }
}

#[cfg(test)]
mod tests {
    // Core imports

    use debug::PrintTrait;

    // Local imports

    use super::{LayoutImpl, Direction, Spot, Move};

    #[test]
    fn test_layouts_moves_from_north() {
        let mut moves = LayoutImpl::moves(Spot::North);
        assert(moves.len() == 1, 'Layout: wrong moves len');

        let move = moves.pop_front().unwrap();
        let expected = Move { direction: Direction::North, spot: Spot::South };
        assert(move.direction == expected.direction, 'Layout: wrong move direction');
        assert(move.spot == expected.spot, 'Layout: wrong move spot');
    }
}
