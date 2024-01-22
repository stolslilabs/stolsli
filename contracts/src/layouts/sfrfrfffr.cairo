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
    fn starts() -> Array<Spot> {
        let mut starts: Array<Spot> = ArrayTrait::new();
        starts.append(Spot::NorthWest);
        starts.append(Spot::North);
        starts.append(Spot::NorthEast);
        starts.append(Spot::East);
        starts.append(Spot::South);
        starts.append(Spot::West);
        starts
    }

    #[inline(always)]
    fn moves(from: Spot) -> Array<Move> {
        let mut moves: Array<Move> = ArrayTrait::new();
        match from {
            Spot::None => {},
            Spot::Center => {}, // TODO: Forbidden, should we panic?
            Spot::NorthWest => {
                moves.append(Move { direction: Direction::North, spot: Spot::SouthWest });
                moves.append(Move { direction: Direction::West, spot: Spot::NorthEast });
            },
            Spot::North => {
                moves.append(Move { direction: Direction::North, spot: Spot::South });
            },
            Spot::NorthEast => {
                moves.append(Move { direction: Direction::North, spot: Spot::SouthEast });
                moves.append(Move { direction: Direction::East, spot: Spot::NorthWest });
            },
            Spot::East => { moves.append(Move { direction: Direction::East, spot: Spot::West }); },
            Spot::SouthEast => {
                moves.append(Move { direction: Direction::East, spot: Spot::SouthWest });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
                moves.append(Move { direction: Direction::West, spot: Spot::SouthEast });
            },
            Spot::South => {
                moves.append(Move { direction: Direction::East, spot: Spot::SouthWest });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
                moves.append(Move { direction: Direction::West, spot: Spot::SouthEast });
            },
            Spot::SouthWest => {
                moves.append(Move { direction: Direction::East, spot: Spot::SouthWest });
                moves.append(Move { direction: Direction::South, spot: Spot::North });
                moves.append(Move { direction: Direction::West, spot: Spot::SouthEast });
            },
            Spot::West => { moves.append(Move { direction: Direction::West, spot: Spot::East }); },
        };
        moves
    }

    #[inline(always)]
    fn area(from: Spot) -> Area {
        match from {
            Spot::None => Area::None,
            Spot::Center => Area::A,
            Spot::NorthWest => Area::B,
            Spot::North => Area::C,
            Spot::NorthEast => Area::D,
            Spot::East => Area::E,
            Spot::SouthEast => Area::F,
            Spot::South => Area::F,
            Spot::SouthWest => Area::F,
            Spot::West => Area::G,
        }
    }

    #[inline(always)]
    fn adjacent_roads(from: Spot) -> Array<Spot> {
        let mut roads: Array<Spot> = ArrayTrait::new();
        match from {
            Spot::None => {},
            Spot::Center => {},
            Spot::NorthWest => {
                roads.append(Spot::North);
                roads.append(Spot::West);
            },
            Spot::North => {},
            Spot::NorthEast => {
                roads.append(Spot::North);
                roads.append(Spot::East);
            },
            Spot::East => {},
            Spot::SouthEast => {
                roads.append(Spot::East);
                roads.append(Spot::West);
            },
            Spot::South => {
                roads.append(Spot::East);
                roads.append(Spot::West);
            },
            Spot::SouthWest => {
                roads.append(Spot::East);
                roads.append(Spot::West);
            },
            Spot::West => {},
        };
        roads
    }

    #[inline(always)]
    fn adjacent_cities(from: Spot) -> Array<Spot> {
        let mut cities: Array<Spot> = ArrayTrait::new();
        cities
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
